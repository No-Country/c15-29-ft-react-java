import React, { useState, useMemo } from 'react';

const useValidation = (regex) => {
    const [value, setValue] = useState("");

    const validateRegex = (value) => value.match(regex);

    const isInvalid = useMemo(() => {
        if (value === "") return false;
        return validateRegex(value) ? false : true;
    }, [value, regex]);

    return [value, setValue, isInvalid];
};

export default useValidation;