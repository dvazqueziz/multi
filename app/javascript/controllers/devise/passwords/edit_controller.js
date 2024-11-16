import ApplicationController from "../application_controller";

// Connects to data-controller="devise--passwords--edit"

export default class extends ApplicationController {

    initialize() {
        this.form = document.querySelector('#kt_new_password_form')
        this.submitButton = document.querySelector('#kt_new_password_submit')
        this.passwordMeter = KTPasswordMeter.getInstance(this.form.querySelector('[data-controller="components--password-meter"]'));
    }

    connect() {
        let context = this
        let form = this.form
        let submitButton = this.submitButton
        let passwordMeter = this.passwordMeter


        let validator = FormValidation.formValidation(
            form,
            {
                locale: 'es_ES',
                localization: FormValidation.locales.es_ES,
                fields: {
                    'user[password]': {
                        validators: {
                            notEmpty: {
                                message: 'Contraseña no puede estar en blanco'
                            },
                            callback: {
                                message: 'Por favor introduzca una contraseña valida',
                                callback: function (input) {
                                    if (input.value.length > 0) {
                                        return context.validatePassword()
                                    }
                                }
                            }
                        }
                    },
                    'user[password_confirmation]': {
                        validators: {
                            notEmpty: {
                                message: 'Confirmación de contraseña no puede estar en blanco'
                            },
                            identical: {
                                compare: function () {
                                    return form.querySelector('[name="user[password]"]').value
                                },
                            }
                        }
                    },
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: false
                        }
                    }),
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

            validator.revalidateField('user[password]');

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

        form.querySelector('input[name="user[password]"]').addEventListener('input', function () {
            if (this.value.length > 0) {
                validator.updateFieldStatus('user[password]', 'NotValidated');
            }
        });
    }

    validatePassword() {
        return (this.passwordMeter.getScore() === 100);
    }
}
