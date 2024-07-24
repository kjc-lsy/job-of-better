import React from "react";
import { FormGroup } from "reactstrap";
import KorDatePicker from "../Picker/KorDatePicker";

const BOpeningDateFormGroup = ({ inputValue, setInputValue }) => {
  return (
    <FormGroup>
      <label>개업일</label>
      <KorDatePicker
        value={inputValue.b_openingDate}
        name="b_openingDate"
        placeholder="개업일(YYYY/MM/DD)"
        oneTap
        shouldDisableDate={(date) => date > new Date()}
        onChange={(date) => {
          setInputValue({ ...inputValue, b_openingDate: date });
        }}
      />
    </FormGroup>
  );
};

export default BOpeningDateFormGroup;

