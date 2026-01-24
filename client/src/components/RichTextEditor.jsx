import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from "lexical";

const theme = {
  paragraph: "editor-paragraph",
};

const RichTextEditor = ({ input, setInput }) => {
  const initialConfig = {
    namespace: "LMS-Editor",
    theme,
    onError(error) {
      console.error(error);
    },
  };

  const handleChange = (editorState) => {
    editorState.read(() => {
        const plainText = $getRoot().getTextContent();
      const htmlString = JSON.stringify(editorState);
      setInput(prev => ({
        ...prev, description:plainText,
      }));
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-md p-2 min-h-[150px]">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[120px]" />
          }
          placeholder={<p className="text-gray-400">Enter description...</p>}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
};

export default RichTextEditor;
