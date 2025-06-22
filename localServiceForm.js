import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LocalServiceForm extends LightningElement {
    @track formData = {
        fullName: '',
        email: '',
        phone: '',
        serviceType: '',
        message: ''
    };

    serviceOptions = [
        { label: 'Electrician', value: 'Electrician' },
        { label: 'Plumber', value: 'Plumber' },
        { label: 'Tutor', value: 'Tutor' },
        { label: 'AC Repair', value: 'AC Repair' },
        { label: 'Gardener', value: 'Gardener' },
        { label: 'Carpentry', value: 'carpentry' },
        { label: 'Water Purifier', value: 'waterPurifier' }
    ];

    serviceType = '';

    showNameError = false;
    showPhoneError = false;
    showServiceError = false;
    emailFormatWarning = false;

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.formData[field] = value;

        if (field === "serviceType") {
            this.serviceType = value;
        }

        if (field === 'fullName') this.showNameError = false;
        if (field === 'phone') this.showPhoneError = false;
        if (field === 'serviceType') this.showServiceError = false;
        if (field === 'email') this.emailFormatWarning = false;
    }

    submitRequest() {
        let isValid = true;

        this.showNameError = false;
        this.showPhoneError = false;
        this.showServiceError = false;
        this.emailFormatWarning = false;

        // Name validation (only alphabets + space)
        if (!/^[A-Za-z\s]+$/.test(this.formData.fullName.trim())) {
            this.showNameError = true;
            this.template.querySelector("lightning-input[name='fullName']").focus();
            isValid = false;
        }

        // Phone validation (exactly 10 digits)
        if (!/^\d{10}$/.test(this.formData.phone.trim())) {
            this.showPhoneError = true;
            this.template.querySelector("lightning-input[name='phone']").focus();
            isValid = false;
        }

        // Service required
        if (!this.formData.serviceType) {
            this.showServiceError = true;
            this.template.querySelector("lightning-combobox[name='serviceType']").focus();
            isValid = false;
        }

        // Email format validation if email is filled
        const trimmedEmail = this.formData.email.trim();
        if (trimmedEmail && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
            this.emailFormatWarning = true;
            isValid = false;
        }

        if (!isValid) return;

        // Show success toast
        const toast = new ShowToastEvent({
            title: 'Success',
            message: 'Your service request has been submitted.',
            variant: 'success'
        });
        this.dispatchEvent(toast);

        // Reset form
        this.formData = {
            fullName: '',
            email: '',
            phone: '',
            serviceType: '',
            message: ''
        };
        this.serviceType = '';

        this.template.querySelectorAll('lightning-input, lightning-combobox').forEach(field => {
            field.value = '';
        });
    }
}
