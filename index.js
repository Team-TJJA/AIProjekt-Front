const CV = document.getElementById("cv");
const Jobannonce = document.getElementById("jobannonce");


document.addEventListener('DOMContentLoaded', createFormEventListener);

let form;

function createFormEventListener() {
    form = document.getElementById('ansøgnings_form');
    form.addEventListener('submit', handleSubmitForm);
}

async function handleSubmitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    try {
        const formData = new FormData(form);
        await postAndPutFormDataAsJson(url, formData);
    } catch (error) {
        alert(error.message);
    }
}

async function postAndPutFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.cv = CV.value;
    plainFormData.jobannonce = Jobannonce.value;
    let response;

    response = await postOrPutObjectAsJson(url, plainFormData);
    if (response.ok) {
        alert('Application generated');
    }
}

async function postOrPutObjectAsJson(url, object) {
    const objectToJsonString = JSON.stringify(object);
    const fetchOption = {
        headers: {'Content-type': 'application/json'},
        body: objectToJsonString
    }
    const response = await fetch(url, fetchOption);
    return response;
}


async function fetchAnyData(url) {
    const response = await fetch(url);
    const jsonFormat = await response.json();
    return jsonFormat;
}