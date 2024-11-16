import ApplicationController from "../application_controller"

// Connects to data-controller="devise--passwords--new"
export default class extends ApplicationController {

    initialize() {
        this.form = document.querySelector('#kt_password_reset_form');
        this.submitButton = document.querySelector('#kt_password_reset_submit');
    }

    connect() {
        let form = this.form
        let submitButton = this.submitButton

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        let validator = FormValidation.formValidation(
            form,
            {
                locale: 'es_ES',
                localization: FormValidation.locales.es_ES,
                fields: {
                    'user[email]': {
                        validators: {
                            notEmpty: {
                                message: 'Email no puede estar en blanco'
                            },
                            emailAddress: {}
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Validate form
            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click
                    submitButton.disabled = true;

                    form.submit();
                }
            });
        });
    }
}
