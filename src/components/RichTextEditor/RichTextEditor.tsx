"use client"
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor(props: {
    pageData: { current: string },
    topic: string
}) {



    type codeSampleType = { text: string, value: string }[]



    const codesample_languages: codeSampleType = [
        { text: 'HTML', value: 'markup' },
        { text: 'CSS', value: 'css' },
        { text: 'JavaScript', value: 'javascript' },
        { text: 'TypeScript', value: 'typescript' },
        { text: 'PHP', value: 'php' },
        { text: 'C', value: 'c' },
        { text: 'C++', value: 'cpp' },
        { text: 'Python', value: 'python' },
        { text: 'Java', value: 'java' },
        { text: 'Fortran', value: 'fortran' },
        { text: 'SQL', value: 'sql' },
        { text: 'MongoDB', value: 'mongodb' },
        { text: 'docker', value: 'docker' },
        { text: 'JSON', value: 'json' },
        { text: 'Bash', value: 'bash' },
    ]


    const langIndex: number = codesample_languages.findIndex(val => val.text.toLowerCase() === props.topic.toLowerCase() || val.value.toLowerCase() === props.topic.toLowerCase())
    if (langIndex != -1) {
        const lang = codesample_languages[langIndex]
        codesample_languages.splice(langIndex, 1)
        codesample_languages.unshift(lang)
    }

    return <Editor

        apiKey={process.env.TINY_API}
        init={{
            plugins: 'anchor autolink charmap codesample image link lists media searchreplace table visualblocks wordcount linkchecker fullscreen',
            toolbar: 'undo redo | blocks fontfamily fontsize bold italic underline strikethrough | numlist bullist link image media table codesample|  align lineheight  indent outdent | charmap  removeformat',
            skin: 'oxide-dark',
            content_css: 'dark',

            codesample_languages,

        }}
        initialValue={props.pageData.current}
        onEditorChange={e => {
            props.pageData.current = e;
        }}

    />
}