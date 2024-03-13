import api from "./api";

export const coverLetterSave = (value) => {
    let data = [
        {'num':1,'question':'sdfsdfsdf'},
        {'num':2,'question':'sdfsdfsdf'},
        {'num':3,'question':'sdfsdfsdf'},
        {'num':4,'question':'sdfsdfsdf'}
    ];

    return api.post('/api/company/cover-letter-save', data)
};