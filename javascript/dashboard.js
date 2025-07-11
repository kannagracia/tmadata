document.addEventListener('DOMContentLoaded', function() {
    const companyListContainer = document.getElementById('company-list');
    const editOverlay = document.getElementById('edit-overlay');
    const editCompanyForm = document.getElementById('edit-company-form');
    const cancelEditButton = document.getElementById('cancel-edit');
    const editCompanyIdInput = document.getElementById('edit-company-id');
    const editCompanyNameInput = document.getElementById('edit-company-name');
    const editCompanyLocationInput = document.getElementById('edit-company-location');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // --- Sample Company Data (In a real app, this would come from a database) ---
    let companies = [
        { id: '1', name: 'PT Abadi Cahaya', location: 'Jakarta' },
        { id: '2', name: 'PT Bintang Dinamika', location: 'Surabaya' },
        { id: '3', name: 'PT Cipta Gemilang', location: 'Bandung' },
        { id: '4', name: 'PT Daya Lestari', location: 'Medan' },
        { id: '5', name: 'PT Emas Sejahtera', location: 'Makassar' }
    ];

    // --- Function to Render Company Cards ---
    function renderCompanyCards() {
        companyListContainer.innerHTML = ''; // Clear existing cards
        companies.forEach(company => {
            const card = document.createElement('div');
            card.classList.add('company-card');
            card.innerHTML = `
                <h3>${company.name}</h3>
                <p>Location: ${company.location}</p>
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
                    editCompanyLocationInput.value = companyToEdit.location;
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
            // In a real app, you would send this updated data to your server
            alert(`Company "${newName}" updated successfully! (Simulated)`);
        }
        
        renderCompanyCards(); // Re-render cards to show updated data
        editOverlay.classList.remove('active'); // Hide the overlay
    });

    // --- Handle Cancel Button Click ---
    cancelEditButton.addEventListener('click', function() {
        editOverlay.classList.remove('active'); // Hide the overlay
    });

    // --- Tab Switching Logic ---
    function showTab(tabId) {
        // Deactivate all tab buttons and content
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate the clicked button and corresponding content
        const clickedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(tabId);

        if (clickedButton && targetContent) {
            clickedButton.classList.add('active');
            targetContent.classList.add('active');
        }

        // If the Company Info tab is activated, re-render cards in case data changed
        if (tabId === 'company-info-tab') {
            renderCompanyCards();
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab + '-tab'; // e.g., 'company-info' -> 'company-info-tab'
            showTab(tabId);
        });
    });

    // --- Initial Render when Page Loads ---
    // Make sure the correct initial tab is displayed and its content rendered
    showTab('company-info-tab'); // Show Company Info tab by default
});