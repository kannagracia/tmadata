document.addEventListener('DOMContentLoaded', function() {
    const companyListContainer = document.getElementById('company-list');
    const editOverlay = document.getElementById('edit-overlay');
    const editCompanyForm = document.getElementById('edit-company-form');
    const cancelEditButton = document.getElementById('cancel-edit');
    const editCompanyIdInput = document.getElementById('edit-company-id');
    const editCompanyNameInput = document.getElementById('edit-company-name');
    const editCompanyLocationInput = document.getElementById('edit-company-location'); // Assuming location is also part of data
    const companySearchInput = document.getElementById('company-search');
    const searchButton = document.getElementById('search-button');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // --- Sample Company Data (In a real app, this would come from a database) ---
    // Added more data to match the "PT ABC" style
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
            card.classList.add('company-card-item'); // Changed class name
            card.innerHTML = `
                <h3>${company.name}</h3>
                <button class="btn-edit" data-id="${company.id}">Edit</button>
            `;
            companyListContainer.appendChild(card);
        });
        addEditButtonListeners(); // Re-attach listeners after rendering
    }

    // --- Function to Add Event Listeners to Edit Buttons ---
    function addEditButtonListeners() {
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', function() {
                const companyId = this.dataset.id;
                const companyToEdit = companies.find(c => c.id === companyId);
                
                if (companyToEdit) {
                    editCompanyIdInput.value = companyToEdit.id;
                    editCompanyNameInput.value = companyToEdit.name;
                    editCompanyLocationInput.value = companyToEdit.location; // Populate location field
                    // Add more fields if needed:
                    // document.getElementById('edit-company-nib').value = companyToEdit.nib;
                    // document.getElementById('edit-company-npwp').value = companyToEdit.npwp;

                    editOverlay.classList.add('active'); // Show the overlay
                }
            });
        });
    }

    // --- Handle Edit Form Submission ---
    editCompanyForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const id = editCompanyIdInput.value;
        const newName = editCompanyNameInput.value;
        const newLocation = editCompanyLocationInput.value;

        // Find the company and update its data
        const companyIndex = companies.findIndex(c => c.id === id);
        if (companyIndex !== -1) {
            companies[companyIndex].name = newName;
            companies[companyIndex].location = newLocation;
            // Update other fields as well:
            // companies[companyIndex].nib = document.getElementById('edit-company-nib').value;
            // companies[companyIndex].npwp = document.getElementById('edit-company-npwp').value;
            
            alert(`Company "${newName}" updated successfully! (Simulated)`);
        }
        
        renderCompanyCards(companySearchInput.value); // Re-render cards with current filter
        editOverlay.classList.remove('active'); // Hide the overlay
    });

    // --- Handle Cancel Button Click ---
    cancelEditButton.addEventListener('click', function() {
        editOverlay.classList.remove('active'); // Hide the overlay
    });

    // --- Search Functionality ---
    searchButton.addEventListener('click', function() {
        renderCompanyCards(companySearchInput.value);
    });

    companySearchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            renderCompanyCards(this.value);
        }
    });

    // --- Tab Switching Logic ---
    function showTab(tabId) {
        // Deactivate all tab buttons and content
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate the clicked button and corresponding content
        const clickedButton = document.querySelector(`.tab-button[data-tab="${tabId.replace('-tab', '')}"]`);
        const targetContent = document.getElementById(tabId);

        if (clickedButton && targetContent) {
            clickedButton.classList.add('active');
            targetContent.classList.add('active');
        }

        // If the Company Info tab is activated, re-render cards with current search filter
        if (tabId === 'company-info-tab') {
            renderCompanyCards(companySearchInput.value);
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab + '-tab'; // e.g., 'company-info' -> 'company-info-tab'
            showTab(tabId);
        });
    });

    // --- Initial Render when Page Loads ---
    showTab('company-info-tab'); // Show Company Info tab by default
});