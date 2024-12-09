const [showTimeDropdown, setShowTimeDropdown] = useState(false);
const today = new Date().toISOString().split("T")[0];
const [selectedTime, setSelectedTime] = useState('');
const [selectedDate, setSelectedDate] = useState(today);


const toggleTimeDropdown = () => {
  setShowTimeDropdown(!showTimeDropdown);
};

const handleTimeChange = (event) => {
  const selectedOption = event.target.value;
  setSelectedTime(selectedOption);
};

const handleDateInput = (event) => {
  const inputDate = event.target.value;
  setSelectedDate(inputDate);
};

const confirmTimeSelection = () => {
  setShowTimeDropdown(false);
};            


const getTimeOptions = () => {
  const now = new Date();
  const options = [];
  const isToday = selectedDate === today;
  let startHour = 0;

  if (isToday) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    options.push({ label: `Now (${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`, value: 'Now' });
    startHour = Math.floor(currentMinutes / 15) * 15 + 15;
  }

  for (let minutes = startHour; minutes < 24 * 60; minutes += 15) {
    const optionTime = new Date(selectedDate);
    optionTime.setHours(0, minutes, 0, 0);
    const label = optionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    options.push({ label, value: label });
  }

  return options;
};


const getDisplayedTime = () => {
  const isToday = selectedDate === today;
  if (selectedTime === 'Now') {
    return `Now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
  } else if (selectedTime && isToday) {
    return `${selectedTime} (Today)`;
  } else if (selectedTime) {
    return `${selectedTime} (${new Date(selectedDate).toLocaleDateString()})`;
  }
  return `Departure now? (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
};
            
            //dong duoi {searchError && <div className="error-message">{searchError}</div>}
            //tren <button className="favorite-btn" onClick={toggleFavouritePlace}>
            //khoang dong 369 
            <div className="departure-option" onClick={toggleTimeDropdown}>
                <Icon icon="mage:clock" className="option-icon" />
                <span className="departure-text">{getDisplayedTime()}</span>
            </div>

              {showTimeDropdown && (
                <div className="time-dropdown">
                  <Select
                    value={selectedTime || `Now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
                    onChange={handleTimeChange}
                    displayEmpty
                    className="time-select"
                  >
                    {getTimeOptions().map((option, index) => (
                      <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                  <TextField
                    type="date"
                    value={selectedDate}
                    onChange={handleDateInput}
                    className="date-select"
                  />
                  <Button variant="contained" onClick={confirmTimeSelection} class="confirm-button">Confirm</Button>
                </div>
              )}