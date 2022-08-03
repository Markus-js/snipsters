import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { createSnippet } from "./utils/createUtils";
import CodeMirror from 'components/CodeMirror';
import CreateForm from "./components/CreateForm";
import Layout from "layout/split";

export default function CreateSnippet() {
  const { data: session } = useSession();
  const [code, setCode] = useState(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(true);
  const [language, setLanguage] = useState('javascript');

  const handleCreate = async () => {
    const title = titleRef.current.value;
    const content = code;
    const authorId = session.user.id;
    const description = descRef.current.value;

    await createSnippet({ title, content, description, authorId, isPublic, language });
    router.push('/');
  }

  return (
    <Layout
      main={<CodeMirror code={code} setCode={setCode} language={language} />}
      aside={
        <CreateForm
          handleCreate={handleCreate}
          isPublic={isPublic} 
          setIsPublic={setIsPublic} 
          titleRef={titleRef} 
          descRef={descRef}
          setLanguage={setLanguage} 
          language={language} 
        />
      }
    />
  );
}        