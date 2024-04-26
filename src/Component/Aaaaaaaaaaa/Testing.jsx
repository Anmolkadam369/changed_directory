import React, { useState } from 'react';
import "./Testing.css"
import { TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import AdapterDateFns from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


// function Testing() {
//     return (
//         <div>
//             <div className="adminformpage-elem-10">
//                 <div className="adminformpage-elem-9">
//                     <div className="adminformpage-elem-8"></div>
//                     <div className="adminformpage-elem-2">
//                         <span className="adminformpage-elem-1">
//                             <p>Claim Pro Assist</p>
//                         </span>
//                     </div>
//                     <div className="adminformpage-elem-7">
//                         <div className="adminformpage-elem-6">
//                             <span className="adminformpage-elem-3"><a href="home.html" className="link" target="_self">
//                                 <p>Home</p>
//                             </a></span>
//                             <span className="adminformpage-elem-4"><a href="#DivMZVC" className="link" target="_self">
//                                 <p>Contact Us</p>
//                             </a></span>
//                             <span className="adminformpage-elem-5"><a href="#DivFlyW" className="link" target="_self">
//                                 <p>Raise Invoice</p>
//                             </a></span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="adminformpage-elem-29">
//                 <div className="adminformpage-elem-28">
//                     <div>
//                         <span className="cd-paragraph-clean adminformpage-elem-15">
//                             <p>Full Details</p>
//                         </span>
//                         <div className="adminformpage-elem-26">
//                             <div className="adminformpage-elem-22">
//                                 <div className="adminformpage-elem-21">
//                                     <span className="cd-paragraph-clean adminformpage-elem-19">
//                                         <p>System Date</p>
//                                     </span>
//                                     <input type="date" placeholder="" className="adminformpage-elem-20" />
//                                 </div>
//                             </div>
//                             <div className="adminformpage-elem-25">
//                                 <div className="adminformpage-elem-24">
//                                     <span className="cd-paragraph-clean adminformpage-elem-30">
//                                         <p>Vendor Location</p>
//                                     </span>
//                                     <input type="email" placeholder="" className="adminformpage-elem-23" />
//                                     <div className="adminformpage-elem-59">
//                                         <span className="cd-paragraph-clean adminformpage-elem-58">
//                                             <p>Accident location with city, state and pincode</p>
//                                         </span>
//                                         <input type="email" placeholder="" className="adminformpage-elem-69" />
//                                     </div>
//                                     <div className="adminformpage-elem-57">
//                                         <span className="cd-paragraph-clean adminformpage-elem-55">
//                                             <p>Spot surveyor details Like Name, mobile no. with popup</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-56" />
//                                     </div>
//                                     <div className="adminformpage-elem-54">
//                                         <span className="cd-paragraph-clean adminformpage-elem-52">
//                                             <p>Date of spot survey done</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-53" />
//                                     </div>
//                                     <div className="adminformpage-elem-51">
//                                         <span className="cd-paragraph-clean adminformpage-elem-49">
//                                             <p>Final Surveyor details with popup</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-50" />
//                                     </div>
//                                     <div className="adminformpage-elem-48">
//                                         <span className="cd-paragraph-clean adminformpage-elem-46">
//                                             <p>Advocate name with Pop up</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-47" />
//                                     </div>
//                                     <div className="adminformpage-elem-45">
//                                         <span className="cd-paragraph-clean adminformpage-elem-43">
//                                             <p>Date of Final Survey</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-44" />
//                                     </div>
//                                     <div className="adminformpage-elem-42">
//                                         <span className="cd-paragraph-clean adminformpage-elem-40">
//                                             <p>Date of second survey</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-41" />
//                                     </div>
//                                     <div className="adminformpage-elem-39">
//                                         <span className="cd-paragraph-clean adminformpage-elem-37">
//                                             <p>Date of RI</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-38" />
//                                     </div>
//                                     <div className="adminformpage-elem-36">
//                                         <span className="cd-paragraph-clean adminformpage-elem-34">
//                                             <p>Delivery Date</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-35" />
//                                     </div>
//                                     <div className="adminformpage-elem-33">
//                                         <span className="cd-paragraph-clean adminformpage-elem-31">
//                                             <p>Etc</p>
//                                         </span>
//                                         <input type="text" placeholder="" className="adminformpage-elem-32" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="adminformpage-elem-18">
//                                 <span className="cd-paragraph-clean adminformpage-elem-16">
//                                     <p>Remarks</p>
//                                 </span>
//                                 <textarea placeholder="Type your message...." className="adminformpage-elem-17"></textarea>
//                             </div>
//                         </div>
//                         <div className="adminformpage-elem-13">
//                             <input type="checkbox" placeholder="" className="adminformpage-elem-11" />
//                             <span className="cd-paragraph-clean adminformpage-elem-12">
//                                 <p>I accept the terms</p>
//                             </span>
//                         </div>
//                         <button className="adminformpage-elem-14" type="submit">
//                             <p>Submit</p>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="paragraph adminformpage-elem-68">
//                 <div className="adminformpage-elem-67">
//                     <span className="adminformpage-elem-60">
//                         <p>This is just a placeholder headline</p>
//                     </span>
//                     <div className="adminformpage-elem-66">
//                         <div className="adminformpage-elem-63">
//                             <span className="adminformpage-elem-61">
//                                 <p>This is just placeholder text. Don’t be alarmed, this is just here to fill up space since your finalized copy isn’t ready yet. Once we have your content finalized, we’ll replace this placeholder text with your real content.</p>
//                             </span>
//                             <button className="adminformpage-elem-62">
//                                 <p>BUTTON TEXT</p>
//                             </button>
//                         </div>
//                         <div className="adminformpage-elem-65">
//                             <span className="adminformpage-elem-64">
//                                 <img src="https://res.cloudinary.com/dbyioi2qq/q_auto/v1678385335/static/1305_833svg_1678385336_31416.svg" alt="Decorative Image" />
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

function Testing() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectValue, setSelectValue] = useState('');
    const [textValue, setTextValue] = useState('');
  
    const handleDateChange = (newValue) => {
      setSelectedDate(newValue);
    };
  
    const handleSelectChange = (event) => {
      setSelectValue(event.target.value);
    };
  
    const handleTextChange = (event) => {
      setTextValue(event.target.value);
    };
  
    return (
      <Box sx={{ width: 300, margin: 'auto', p: 2 }}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Text Input"
            variant="outlined"
            value={textValue}
            onChange={handleTextChange}
          />
        </FormControl>
  
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Dropdown</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectValue}
            label="Dropdown"
            onChange={handleSelectChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
  
        <FormControl fullWidth margin="normal">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date picker"
              inputFormat="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    );
  }
  
  

export default Testing;
