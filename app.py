from flask import Flask, request, jsonify, render_template
import sqlite3
app = Flask(__name__)
# Database setup
def init_db():
    conn = sqlite3.connect('bookings.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            service TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
init_db()
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/api/book', methods=['POST'])
def book_appointment():
    data = request.get_json()
    service = data['service']
    date = data['date']
    time = data['time']
    conn = sqlite3.connect('bookings.db')
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM appointments WHERE date = ? AND time = ?
    ''', (date, time))
    if cursor.fetchone():
        return jsonify({'success': False, 'message': 'Time slot already booked.'}), 400
    cursor.execute('''
        INSERT INTO appointments (service, date, time) VALUES (?, ?, ?)
    ''', (service, date, time))
    conn.commit()
    conn.close()
    return jsonify({'success': True, 'message': 'Appointment booked successfully.'})
if __name__ == '__main__':
    app.run(debug=True)
