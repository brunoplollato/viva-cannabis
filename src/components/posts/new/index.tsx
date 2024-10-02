'use client'

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { PostsService } from "@/services/posts";
import { CategoryProps } from "@/types/DTO";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem, Button, Chip, Input, Switch } from "@nextui-org/react";
import { upload } from "@vercel/blob/client";
import { EditorState, convertToRaw } from "draft-js";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, ComponentType, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDropzone } from 'react-dropzone';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
const Editor = dynamic(
  () =>
    import('react-draft-wysiwyg').then(
      mod => mod.Editor as ComponentType<EditorProps>,
    ),
  { ssr: false },
);

const formSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  content: z.string(),
  image: z.string(),
  categoryId: z.string(),
  tags: z.string().array(),
  published: z.boolean(),
  userId: z.string(),
})

export default function NewPost({ categories }: { categories: CategoryProps }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [inputValue, setInputValue] = useState('')
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty())
  const [chips, setChips] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const value = inputValue.trim()
      if (value && !chips.includes(value)) {
        setChips([...chips, value])
        form.setValue('tags', [...chips, value])
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      setChips(chips.slice(0, -1))
      form.setValue('tags', chips.slice(0, -1))
    }
  }

  const removeChip = (chipToRemove: string) => {
    setChips(chips.filter(chip => chip !== chipToRemove))
  }

  const handleInputClick = () => {
    inputRef.current?.focus()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "Tested content",
      image: "",
      categoryId: "",
      tags: [],
      published: false,
      userId: ''
    },
  })
  const isPublished = form.watch('published')
  const postTitle = form.watch('title')

  function validateImageDimension(file: any) {
    const img = new Image()
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width / img.height !== 2.5) {
        toast.error('A imagem deve ter 1800x720')
      }
    }
    return null
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
    setCoverImage(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    validator: validateImageDimension,
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    multiple: false
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (file && user) {
      const formData = await new FormData();
      formData.append('photo', file, values.slug);
      const newBlob = await upload(`posts/${values.slug}`, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      values.image = newBlob.url;
      values.userId = user.id;
      const res = await PostsService.create(values)
      if (!res.error) {
        router.push('/dashboard/posts')
      }
    }
  }

  useEffect(() => {
    //@ts-ignore
    form.setValue('slug', postTitle.replaceAll(' ', '-').replace(/![^\p{L}\s._0-9\-]+/g, '').toLowerCase().normalize('NFD').replaceAll(/[\u0300-\u036f]/g, ""));
  }, [postTitle]);

  useEffect(() => {
    const convertedRaw = convertToRaw(editorState?.getCurrentContent());
    form.setValue('content', JSON.stringify(convertedRaw));
  }, [editorState]);

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <Link href={"/dashboard"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span> </span>
          <Link href={"/dashboard/posts"}>
            <span>Posts</span>
          </Link>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span> </span>
          <span>Novo</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Novo Post</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow md:w-2/3">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        variant="underlined"
                        label="Título"
                        placeholder="Digite o título do post..."
                        fullWidth
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        variant="underlined"
                        label="Slug"
                        placeholder="Digite o título do post..."
                        fullWidth
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mb-4">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={setEditorState as any}
                />
              </div>
            </div>
          </div>

          <div className="md:w-1/4 space-y-4">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="w-full flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Públicar</span>
                  <FormControl>
                    <Switch
                      size="sm"
                      checked={field.value}
                      onClick={() => form.setValue('published', !field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Arraste a imagem aqui...</p> :
                  <p>Arraste uma imagem de destaque aqui, <br /> ou clique para escolher uma</p>
              }
              {coverImage && (
                <img src={coverImage} alt="Cover" className="mt-2 max-h-40 mx-auto rounded" />
              )}
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full flex justify-between items-center">
                  <FormControl>
                    <Autocomplete
                      variant="underlined"
                      label="Categoria"
                      placeholder="Selecione uma categoria"
                      value={form.getValues('categoryId')}
                      items={categories as any}
                      onSelectionChange={(key) => {
                        if (key)
                          form.setValue('categoryId', key as string)
                      }}
                    >
                      {(item: { id: string, title: string }) => <AutocompleteItem key={item.id} value={item.title}>{item.title}</AutocompleteItem>}
                    </Autocomplete>
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="w-full flex justify-between items-center">
                    <FormControl>
                      <Input
                        variant="underlined"
                        ref={inputRef}
                        label="Tags"
                        value={inputValue}
                        onChange={handleInputChange}
                        onClick={handleInputClick}
                        onKeyDown={handleInputKeyDown}
                        classNames={{
                          inputWrapper: "h-auto min-h-24 items- justify-end py-2 gap-2",
                          input: "w-auto",
                          innerWrapper: "flex flex-wrap items-center h-auto",
                          label: "top-10"
                        }}
                        startContent={
                          <div className="flex gap-1 max-w-[calc(100%-20px)] justify-start flex-wrap mt-10 h-auto">
                            {chips.map((chip, index) => (
                              <Chip
                                key={index}
                                onClose={() => removeChip(chip)}
                                variant="flat"
                                className="max-w-[calc(100%-8px)] h-7"
                              >
                                <span className="truncate">{chip}</span>
                              </Chip>
                            ))}
                          </div>
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" color={isPublished ? "primary" : "warning"} className="w-full text-white">
              {isPublished ? 'Publicar Post' : 'Salvar Rascunho'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}