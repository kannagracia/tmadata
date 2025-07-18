// javascript/dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('dashboard.js loaded and DOMContentLoaded fired.');

    // --- DOM Elements ---
    const companyListContainer = document.getElementById('company-list');
    const companySearchInput = document.getElementById('searchInput'); // Corrected ID
    const searchButton = document.getElementById('searchButton');     // Corrected ID

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Edit Modal Elements
    const editOverlay = document.getElementById('edit-overlay');
    const editCompanyForm = document.getElementById('edit-company-form');
    const cancelEditButton = document.getElementById('cancel-edit');
    const editCompanyIdInput = document.getElementById('edit-company-id');
    const editCompanyNameInput = document.getElementById('edit-company-name');
    const editCompanyLocationInput = document.getElementById('edit-company-location');

    // Delete Modal Elements (NEW)
    const deleteModalOverlay = document.getElementById('delete-modal-overlay');
    const companyNameToDeleteSpan = document.getElementById('company-name-to-delete');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');

    let companyToDeleteId = null; // Variable to store the ID of the company to be deleted

    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found tab contents:', tabContents.length);
    console.log('Found search input:', companySearchInput);
    console.log('Found search button:', searchButton);

    // --- Sample Company Data ---
    let companies = [
        { id: '1', name: 'PT ABC', location: 'Jakarta', nib: '01234567890123', npwp: '12.345.678.9-012.345' },
        { id: '2', name: 'PT DEF', location: 'Surabaya', nib: '09876543210987', npwp: '98.765.432.1-098.765' },
        { id: '3', name: 'PT GHI', location: 'Bandung', nib: '11223344556677', npwp: '11.223.344.5-566.778' },
        { id: '4', name: 'CV JKL', location: 'Medan', nib: '22334455667788', npwp: '22.334.455.6-677.889' },
        { id: '5', name: 'PT MNO', location: 'Makassar', nib: '33445566778899', npwp: '33.445.566.7-788.990' },
        { id: '6', name: 'PT PQR', location: 'Semarang', nib: '44556677889900', npwp: '44.556.677.8-899.001' },
        { id: '7', name: 'PT STU', location: 'Yogyakarta', nib: '55667788990011', npwp: '55.667.788.9-900.112' },
        { id: '8', name: 'CV VWX', location: 'Denpasar', nib: '66778899001122', npwp: '66.778.899.0-011.223' }
    ];

    // --- Function to Render Company Cards ---
    function renderCompanyCards(filterText = '') {
        console.log('Rendering company cards with filter:', filterText);
        companyListContainer.innerHTML = ''; // Clear existing cards
        const filteredCompanies = companies.filter(company =>
            company.name.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredCompanies.length === 0) {
            companyListContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: #777;">No companies found matching your search.</p>';
            return;
        }

        filteredCompanies.forEach(company => {
            const card = document.createElement('div');
            card.classList.add('repository-item');
            
            card.innerHTML = `
                <div class="item-content">
                    <h2><a href="company-detail.html?id=${company.id}">${company.name}</a></h2>
                </div>
                <div class="action-buttons">
                    <button class="btn-edit" data-id="${company.id}">Edit</button>
                    <button class="btn-delete" data-id="${company.id}" data-name="${company.name}">Delete</button>
                </div>
            `;
            companyListContainer.appendChild(card);
        });
        
        // Re-attach listeners after rendering new cards
        addEditButtonListeners();
        addDeleteButtonListeners(); // Call the new function here
    }

    // --- Function to Add Event Listeners to Edit Buttons ---
    function addEditButtonListeners() {
        console.log('Adding edit button listeners.');
        document.querySelectorAll('.btn-edit').forEach(button => {
            // Remove existing listener to prevent duplicates if renderCompanyCards is called multiple times
            button.removeEventListener('click', handleEditClick); 
            button.addEventListener('click', handleEditClick);
        });
    }

    function handleEditClick() {
        console.log('Edit button clicked for ID:', this.dataset.id);
        const companyId = this.dataset.id;
        const companyToEdit = companies.find(c => c.id === companyId);
        
        if (companyToEdit) {
            editCompanyIdInput.value = companyToEdit.id;
            editCompanyNameInput.value = companyToEdit.name;
            editCompanyLocationInput.value = companyToEdit.location;
            editOverlay.classList.add('active');
        }
    }

    // --- Function to Add Event Listeners to Delete Buttons ---
    function addDeleteButtonListeners() {
        console.log('Adding delete button listeners.');
        document.querySelectorAll('.btn-delete').forEach(button => {
            // Remove existing listener to prevent duplicates
            button.removeEventListener('click', handleDeleteClick);
            button.addEventListener('click', handleDeleteClick);
        });
    }

    function handleDeleteClick() {
        console.log('Delete button clicked for ID:', this.dataset.id);
        companyToDeleteId = this.dataset.id; // Store ID for confirmation
        const companyName = this.dataset.name;
        companyNameToDeleteSpan.textContent = `"${companyName}"`; // Update modal text
        deleteModalOverlay.classList.add('active'); // Show the delete modal
    }

    // --- Handle Delete Confirmation (NEW) ---
    confirmDeleteButton.addEventListener('click', function() {
        console.log('Confirm delete clicked for ID:', companyToDeleteId);
        if (companyToDeleteId) {
            // In a real app, you'd send this ID to a backend API to delete the company
            companies = companies.filter(company => company.id !== companyToDeleteId);
            alert('Company deleted successfully! (Simulated)'); // Or display a success message differently
            renderCompanyCards(companySearchInput.value); // Re-render the list
        }
        deleteModalOverlay.classList.remove('active'); // Hide the modal
        companyToDeleteId = null; // Reset the stored ID
    });

    // --- Handle Cancel Delete (NEW) ---
    cancelDeleteButton.addEventListener('click', function() {
        console.log('Cancel delete clicked.');
        deleteModalOverlay.classList.remove('active'); // Hide the modal
        companyToDeleteId = null; // Reset the stored ID
    });

    // --- Handle Edit Form Submission ---
    editCompanyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Edit form submitted.');

        const id = editCompanyIdInput.value;
        const newName = editCompanyNameInput.value;
        const newLocation = editCompanyLocationInput.value;

        const companyIndex = companies.findIndex(c => c.id === id);
        if (companyIndex !== -1) {
            companies[companyIndex].name = newName;
            companies[companyIndex].location = newLocation;
            alert(`Company "${newName}" updated successfully! (Simulated)`);
        }
        
        renderCompanyCards(companySearchInput.value);
        editOverlay.classList.remove('active');
    });

    // --- Handle Cancel Edit Button Click ---
    cancelEditButton.addEventListener('click', function() {
        console.log('Cancel edit button clicked.');
        editOverlay.classList.remove('active');
    });

    // --- Search Functionality ---
    searchButton.addEventListener('click', function() {
        console.log('Search button clicked.');
        renderCompanyCards(companySearchInput.value);
    });

    companySearchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            console.log('Enter key pressed in search input.');
            renderCompanyCards(this.value);
        } else if (this.value === '') { // Optional: re-render all companies if search box is cleared
            renderCompanyCards('');
        }
    });

    // --- Tab Switching Logic ---
    function showTab(tabId) {
        console.log('Attempting to show tab:', tabId);
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        const clickedButton = document.querySelector(`.tab-button[data-tab="${tabId.replace('-tab', '')}"]`);
        const targetContent = document.getElementById(tabId);

        console.log('Clicked Button element (in showTab):', clickedButton);
        console.log('Target Content element (in showTab):', targetContent);

        if (clickedButton && targetContent) {
            clickedButton.classList.add('active');
            targetContent.classList.add('active');
        } else {
            console.warn('Could not find tab button or content for tabId:', tabId);
        }

        if (tabId === 'company-info-tab') {
            renderCompanyCards(companySearchInput.value); // Re-render when company info tab is active
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Tab button click event fired!');
            const tabId = this.dataset.tab + '-tab';
            showTab(tabId);
        });
    });

    // --- Initial Render when Page Loads ---
    showTab('company-info-tab'); // Show the company info tab by default and render cards
});