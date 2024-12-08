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