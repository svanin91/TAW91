import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Option } from "react-google-places-autocomplete/build/types";
import { SingleValue } from "react-select";

const InputIndirizzo = (props: {
  thisState: string;
  thisSetState: React.Dispatch<React.SetStateAction<string>>;
  initial?: string;
}) => {
  const { thisState, thisSetState, initial } = props;
  const [value, setValue] = useState<SingleValue<Option>>();

  useEffect(() => {
    if (initial) {
      thisSetState(initial);
    }
  }, [initial, thisState, thisSetState]);

  useEffect(() => {
    if (value?.value && value.value.structured_formatting.main_text) {
      thisSetState(value.value.structured_formatting.main_text);
    }
  }, [value, thisSetState]);

  return (
    <div className="relative">
      <GooglePlacesAutocomplete
        apiKey="AIzaSyCA_zQQaCxu_JnMJ3iXMEIunn3jqoidBSg"
        apiOptions={{ language: "it", region: "it" }}
        autocompletionRequest={{
          types: ["address"],
          componentRestrictions: {
            country: ["it"],
          },
        }}
        selectProps={{
          placeholder: initial ? initial : "Indirizzo",
          styles: {
            input: (base: any) => ({
              ...base,
              width: "100%",
              paddingTop: "0.67rem",
              paddingBottom: "0.67rem",
              borderRadius: "0.375rem",
              fontSize: "1rem",
            }),
            control: (base: any) => ({
              ...base,
              background: "white",
              borderRadius: 24,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              ":focus-within": {
                borderColor: "#EEC900",
                borderWidth: 2,
              },
            }),
            placeholder: (base: any) => ({
              ...base,
            }),
            option: (base: any) => ({
              ...base,
              borderBottomWidth: 1,
              borderColor: "lightblue",
            }),
            loadingIndicator: (base: any) => ({
              ...base,
              color: "lightblue",
            }),
            loadingMessage: (base: any) => ({
              ...base,
              color: "lightblue",
              fontWeight: "bold",
            }),
            noOptionsMessage: (base: any) => ({
              ...base,
              color: "lightgray",
              fontWeight: "bold",
            }),
            valueContainer: (base: any) => ({
              ...base,
              paddingLeft: "2%",
            }),
          },
          value,
          onChange: setValue,
          //className: " w-full rounded-lg text-black  block flex-1 text-sm",
        }}
      />
    </div>
  );
};
export default InputIndirizzo;

/**
 *          styles: {
            input: (base: any) => ({
              ...base,
              width: "100%",
              paddingTop: "0.67rem",
              paddingBottom: "0.67rem",
              borderRadius: "0.375rem",
              fontSize: "1rem",
            }),
            control: (base: any) => ({
              ...base,
              background: "white",
              borderRadius: 24,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              ":focus-within": {
                borderColor: "#EEC900",
                borderWidth: 2,
              },
            }),
            placeholder: (base: any) => ({
              ...base,
            }),
            option: (base: any) => ({
              ...base,
              borderBottomWidth: 1,
              borderColor: "lightblue",
            }),
            loadingIndicator: (base: any) => ({
              ...base,
              color: "lightblue",
            }),
            loadingMessage: (base: any) => ({
              ...base,
              color: "lightblue",
              fontWeight: "bold",
            }),
            noOptionsMessage: (base: any) => ({
              ...base,
              color: "lightgray",
              fontWeight: "bold",
            }),
            valueContainer: (base: any) => ({
              ...base,
              paddingLeft: "2%",
            }),
          },
 */
