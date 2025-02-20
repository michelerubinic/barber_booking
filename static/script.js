document.addEventListener("DOMContentLoaded", function () {
    function deleteAppointment(appointmentId) {
        if (!confirm("Are you sure you want to delete this appointment?")) {
            return;
        }

        fetch(`/delete_appointment/${appointmentId}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Appointment deleted successfully.");
                location.reload();
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while deleting the appointment.");
        });
    }

    document.querySelectorAll(".delete-appointment").forEach(button => {
        button.addEventListener("click", function () {
            const appointmentId = this.dataset.id;
            deleteAppointment(appointmentId);
        });
    });
});
