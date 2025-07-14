// javascript/dashboard.js (Replace entire content with this)

document.addEventListener('DOMContentLoaded', function() {
    // Add these logs back to confirm script execution
    console.log('dashboard.js loaded and DOMContentLoaded fired.');

    const companyListContainer = document.getElementById('company-list');
    const editOverlay = document.getElementById('edit-overlay');
    const editCompanyForm = document.getElementById('edit-company-form');
    const cancelEditButton = document.getElementById('cancel-edit');
    const editCompanyIdInput = document.getElementById('edit-company-id');
    const editCompanyNameInput = document.getElementById('edit-company-name');
    const editCompanyLocationInput = document.getElementById('edit-company-location');

    // FIX: Corrected IDs to match dashboard.html
    const companySearchInput = document.getElementById('searchInput'); // Changed from 'company-search'
    const searchButton = document.getElementById('searchButton');     // Changed from 'search-button'

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found tab contents:', tabContents.length);
    console.log('Found search input:', companySearchInput); // Verify it's not null now
    console.log('Found search button:', searchButton);     // Verify it's not null now


    // --- Sample Company Data (In a real app, this would come from a database) ---
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
            card.classList.add('company-card-item');
            card.innerHTML = `
                <h3>${company.name}</h3>
                <button class="btn-edit" data-id="${company.id}">Edit</button>
            `;
            companyListContainer.appendChild(card);
        });
        addEditButtonListeners();
    }

    // --- Function to Add Event Listeners to Edit Buttons ---
    function addEditButtonListeners() {
        console.log('Adding edit button listeners.');
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', function() {
                console.log('Edit button clicked for ID:', this.dataset.id);
                const companyId = this.dataset.id;
                const companyToEdit = companies.find(c => c.id === companyId);
                
                if (companyToEdit) {
                    editCompanyIdInput.value = companyToEdit.id;
                    editCompanyNameInput.value = companyToEdit.name;
                    editCompanyLocationInput.value = companyToEdit.location;
                    editOverlay.classList.add('active');
                }
            });
        });
    }

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

    // --- Handle Cancel Button Click ---
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
            // Ensure companySearchInput is not null before accessing .value
            renderCompanyCards(companySearchInput ? companySearchInput.value : '');
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
    showTab('company-info-tab');
});