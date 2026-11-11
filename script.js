
/* Twin Cities Animal Rescue - JavaScript */

// Volunteer opportunity information
const opportunities = [
{
    id: "animal-care",
    name: "Animal Care",
    description: "Help feed, socialize, and care for rescued animals.",
    schedule: "Weekdays and weekends"
},
{
    id: "adoption-events",
    name: "Adoption Events",
    description: "Help families meet adoptable pets at community events.",
    schedule: "Primarily weekends"
},
{
    id: "transportation",
    name: "Animal Transportation",
    description: "Transport animals to appointments and foster homes.",
    schedule: "Flexible scheduling"
}
];

// Find the selected opportunity
function findOpportunity(id) {
return opportunities.find(function(item) {
    return item.id === id;
});
}

// Display opportunity information
function displayOpportunity() {
const selectedId = document.getElementById("opportunity").value;
const details = document.getElementById("opportunity-details");
const opportunity = findOpportunity(selectedId);

details.replaceChildren();

if (!opportunity) {
    details.textContent = "Select an opportunity to see its details.";
    return;
}

const heading = document.createElement("h3");
heading.textContent = opportunity.name;

const description = document.createElement("p");
description.textContent = opportunity.description;

const schedule = document.createElement("p");
schedule.textContent = "Availability: " + opportunity.schedule;

details.append(heading, description, schedule);
}

// Save the user's selection
function savePreference() {
const selectedId = document.getElementById("opportunity").value;
const message = document.getElementById("save-message");

if (!findOpportunity(selectedId)) {
    message.textContent = "Please select an opportunity first.";
    return;
}

localStorage.setItem("volunteerPreference", selectedId);
message.textContent = "Your volunteer preference has been saved!";
}

// Restore the saved selection
function loadPreference() {
const savedId = localStorage.getItem("volunteerPreference");

if (savedId && findOpportunity(savedId)) {
    document.getElementById("opportunity").value = savedId;
    displayOpportunity();
}
}

// Connect JavaScript to the page
document.addEventListener("DOMContentLoaded", function() {
const selector = document.getElementById("opportunity");
const saveButton = document.getElementById("save-preference");

if (selector && saveButton) {
    selector.addEventListener("change", function() {
        displayOpportunity();
        document.getElementById("save-message").textContent = "";
    });

    saveButton.addEventListener("click", savePreference);

    loadPreference();
}
});


// Form validation rules

const validationRules = {
fullname: {
    required: true,
    minLength: 2
},
email: {
    required: true
},
interest: {
    required: true
},
availability: {
    required: true
},
experience: {
    required: true,
    minLength: 10
}
};


// Display an error beside a field
function showError(fieldId, message) {
const error = document.getElementById(fieldId + "-error");
const field = document.getElementById(fieldId);

error.textContent = message;

if (message) {
    field.setAttribute("aria-invalid", "true");
} else {
    field.removeAttribute("aria-invalid");
}
}

// Validate one field
function validateField(fieldId) {
const field = document.getElementById(fieldId);
const value = field.value.trim();
const rule = validationRules[fieldId];

if (rule.required && value.length === 0) {
    showError(fieldId, "This field is required.");
    return false;
}

if (rule.minLength && value.length < rule.minLength) {
    showError(
        fieldId,
        "Please enter at least " + rule.minLength + " characters."
    );
    return false;
}

if (fieldId === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(value)) {
        showError(fieldId, "Please enter a valid email address.");
        return false;
    }
}

showError(fieldId, "");
return true;
}

// Validate the form before submission

function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    Object.keys(validationRules).forEach(function(fieldId) {
        if (!validateField(fieldId)) {
            isValid = false;
        }
    });

    const successMessage = document.getElementById("form-success");

    if (!isValid) {
        successMessage.textContent = "";
        return;
    }

    successMessage.textContent =
        "Your information passed validation. " +
        "This is a demonstration form; no information was sent.";
}

// Set up validation when the page loads
document.addEventListener("DOMContentLoaded", function() {
const form = document.getElementById("interest-form");

if (form) {
    form.addEventListener("submit", validateForm);

    Object.keys(validationRules).forEach(function(fieldId) {
        const field = document.getElementById(fieldId);

const eventType = field.tagName === "SELECT" ? "change" : "input";

field.addEventListener(eventType, function() {
validateField(fieldId);
});
    });
}
});


/* Remember the user's interest type */

function saveInterestType() {
    const interest = document.getElementById("interest");

    localStorage.setItem("savedInterestType", interest.value);
}

function loadInterestType() {
    const savedInterest = localStorage.getItem("savedInterestType");
    const interest = document.getElementById("interest");

    if (savedInterest) {
        const validOption = Array.from(interest.options).some(
            function(option) {
                return option.value === savedInterest;
            }
        );

        if (validOption) {
            interest.value = savedInterest;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const interest = document.getElementById("interest");

    if (interest) {
        interest.addEventListener("change", saveInterestType);
        loadInterestType();
    }
});

