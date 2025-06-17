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
        { label: 'Gardener', value: 'Gardener' }
    ];

    serviceType = '';

    showNameError = false;
    showPhoneError = false;
    showServiceError = false;

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.formData[field] = value;

        // Update dropdown value
        if (field === "serviceType") {
            this.serviceType = value;
        }

        // Clear error flags while typing
        if (field === 'fullName') this.showNameError = false;
        if (field === 'phone') this.showPhoneError = false;
        if (field === 'serviceType') this.showServiceError = false;
    }

    submitRequest() {
        let isValid = true;

        // Reset errors
        this.showNameError = false;
        this.showPhoneError = false;
        this.showServiceError = false;

        // Check required fields
        if (!this.formData.fullName.trim()) {
            this.showNameError = true;
            isValid = false;
        }

        if (!this.formData.phone.trim()) {
            this.showPhoneError = true;
            isValid = false;
        }

        if (!this.formData.serviceType) {
            this.showServiceError = true;
            isValid = false;
        }

        if (!isValid) {
            // Do not show toast if form is invalid — inline messages are already shown
            return;
        }

        // Form is valid → Show success toast
        const toast = new ShowToastEvent({
            title: 'Success',
            message: 'Your service request has been submitted.',
            variant: 'success',
        });
        this.dispatchEvent(toast);

        // Reset form fields
        this.formData = {
            fullName: '',
            email: '',
            phone: '',
            serviceType: '',
            message: ''
        };
        this.serviceType = '';

        // Clear visible inputs
        this.template.querySelectorAll('lightning-input, lightning-combobox').forEach(field => {
            field.value = '';
        });
    }
}
