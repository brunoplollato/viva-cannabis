'use client'

import { ConfigurationService } from "@/services/configuration"
import { ConfigurationProps } from "@/types/DTO"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Chip, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import Link from "next/link"
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "../ui/form"

const socialMediaPlatforms = ["Twitter", "Facebook", "Instagram", "LinkedIn", "TikTok", "Youtube"] as any

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()),
  socialMedia: z.array(z.object({
    platform: z.enum(socialMediaPlatforms),
    url: z.string().url("Invalid URL")
  })),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address")
})

type FormData = z.infer<typeof formSchema>

export default function Configuration({ data }: { data: ConfigurationProps }) {
  const [inputValue, setInputValue] = useState('')
  const [chips, setChips] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: data,
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      socialMedia: [],
      phone: "",
      email: ""
    }
  })
  const socialMedia = form.watch("socialMedia")

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

  const handleAddSocialMedia = (platform: typeof socialMediaPlatforms[number]) => {
    if (socialMedia && !socialMedia.some(sm => sm.platform === platform)) {
      form.setValue("socialMedia", [...socialMedia, { platform, url: "" }])
      const index = socialMediaPlatforms.indexOf(platform)
      socialMediaPlatforms.splice(index, 1)
    }
  }

  const handleRemoveSocialMedia = (platform: typeof socialMediaPlatforms[number]) => {
    form.setValue("socialMedia", socialMedia.filter(sm => sm.platform !== platform))
    socialMediaPlatforms.push(platform)
  }

  const handleInputClick = () => {
    inputRef.current?.focus()
  }

  const handlePost = async (data: FormData) => {
    const configData: ConfigurationProps = {
      ...data,
      socialMedia: data.socialMedia.map(sm => ({
        ...sm,
        platform: sm.platform as "Twitter" | "Facebook" | "Instagram" | "LinkedIn" | "TikTok" | "Youtube"
      }))
    }
    await ConfigurationService.create(configData)
  }

  const onSubmit = (data: FormData) => {
    handlePost(data)
  }

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
          <span>Configurações</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Configurações</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <p className="text-lg font-bold">SEO</p>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    label="Título do site"
                    placeholder="Digite o título do site"
                    variant="underlined"
                    errorMessage={form.formState.errors.title?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    label="Descrição do site"
                    placeholder="Digite a descrição do site"
                    variant="underlined"
                    errorMessage={form.formState.errors.description?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <div className="flex gap-2">
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
          </div>
          <div>
            <p className="text-lg font-bold mb-4">Contato</p>
            <p className="text-sm font-medium mb-1">Redes Sociais</p>
            <Select
              label="Adicionar Rede Social"
              placeholder="Selecione uma Rede Social"
              variant="underlined"
              onChange={(e) => handleAddSocialMedia(e.target.value as typeof socialMediaPlatforms[number])}
            >
              {socialMediaPlatforms.map((platform: string) => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </Select>
            {socialMedia && socialMedia.map((sm, index) => (
              <div key={sm.platform} className="flex gap-2 mt-2">
                <FormField
                  control={form.control}
                  name={`socialMedia.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          label={sm.platform}
                          placeholder={`Digite a URL do ${sm.platform}`}
                          variant="underlined"
                          errorMessage={form.formState.errors.socialMedia?.[index]?.url?.message}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button color="danger" onClick={() => handleRemoveSocialMedia(sm.platform)}>Remover</Button>
              </div>
            ))}
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    label="Telefone"
                    placeholder="Digite um telefone"
                    type="tel"
                    variant="underlined"
                    errorMessage={form.formState.errors.phone?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    label="Email"
                    placeholder="Digite um endereço de email"
                    type="email"
                    variant="underlined"
                    errorMessage={form.formState.errors.email?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" color="primary" className="mt-4">
            Salvar Configurações
          </Button>
        </form>
      </Form>
    </div>
  )
}