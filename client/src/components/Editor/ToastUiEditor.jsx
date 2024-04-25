import React from 'react';
import {Editor} from "@toast-ui/react-editor";

const ToastUiEditor = React.forwardRef((props, ref) => {
    return (
        <Editor
            previewStyle={window.innerWidth < 991 ? 'tab' : 'vertical'}
            height="600px"
            initialEditType="markdown"
            ref={ref}
            {...props}
        />
    );
});

export default ToastUiEditor;