import { LightningElement,track } from 'lwc';
import getContactList from '@salesforce/apex/ContactListController.findAll'
export default class TestLWCStack extends LightningElement {
    bAllowMultiple = false;
    activeSectionsMessage ='';
    @track contacts;
    
    connectedCallback() {
        getContactList()
        .then(result => {
            //this.contacts = result;
              result.forEach(contact => {
                  contact.label = contact.Name.slice(0,3);
                  contact.showPara = true;
              });
              this.contacts = result;
              this.bAllowMultiple = true;
        })
        .catch(error => {
            this.error = error;
        });
    }
    handleSectionToggle(event) {
        const openSections = event.detail.openSections;
        console.log('ss'+JSON.stringify(event.detail));
        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
        this.template.querySelectorAll('lightning-accordion-section').forEach(elem => {
            console.log('Swap-->'+JSON.stringify(elem));
            console.log('Swap-->'+elem.label);
            /*
            if(openSections.includes(elem.name)) {
                elem.label = this.contacts.find(item => item.Name == elem.name).Name;
            }
            else {
                elem.label = this.contacts.find(item => item.Name == elem.name).label;
            }
            */
            if(openSections.includes(elem.name)) {
                this.contacts[this.contacts.findIndex(item => item.Name == elem.name)].showPara = false;
            }
            else {
                this.contacts[this.contacts.findIndex(item => item.Name == elem.name)].showPara = true;
            }
            console.log('Swap-->'+elem.label);
        });    
    }
    
}