import ApplicationController from "../application_controller"

// Connects to data-controller="devise--sessions--new"
export default class extends ApplicationController {

    initialize() {
        this.form = document.querySelector('#kt_sign_in_form');
        this.submitButton = document.querySelector('#kt_sign_in_submit');
    }

    connect() {
        let form = this.form
        let submitButton = this.submitButton

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
                    },
                    'user[password]': {
                        validators: {
                            notEmpty: {
                                message: 'Contraseña no puede estar en blanco'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                    })
                }
            }
        );

        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            // Prevent button default action
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
