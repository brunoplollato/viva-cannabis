"use client";
import { PostsService } from "@/services/posts";
import { PostProps } from "@/types/DTO";
import { Button, Chip, Input, Tooltip } from '@nextui-org/react';
import { useSession } from "next-auth/react";
import { useTheme as useNextTheme } from "next-themes";
import Link from "next/link";
import { ChangeEventHandler, useCallback, useState } from "react";
import { EditIcon } from "../icons/table/edit-icon";
import { TableWrapper } from "../table/table";
import { columns } from "./data";
import { Delete } from "./delete";

export const Posts = ({ data }: { data: PostProps[] }) => {
  const { resolvedTheme } = useNextTheme();
  const { data: session } = useSession();
  const user = session?.user;
  const [posts, setPosts] = useState(data)

  const fetchPosts = useCallback(async () => {
    const res: PostProps[] = await PostsService.listAll(100, 0)
    setPosts(res)
  }, [])

  const handleAdd = useCallback(async (values: PostProps) => {
    const res = await PostsService.create(values)
    if (!res.error)
      fetchPosts()
  }, [])

  const handleDelete = useCallback(async (id: string) => {
    const res = await PostsService.delete(id);
    if (!res.error) fetchPosts()
  }, [])

  const handleEdit = useCallback(async (values: PostProps, id: string) => {
    const res = await PostsService.update(values, id)
    if (!res.error)
      fetchPosts()
  }, [])

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTimeout(() => {
      if (e.target.value.length >= 3) {
        const filteredPosts = data.filter(
          item => item.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setPosts(filteredPosts)
      } else if (e.target.value.length === 0) {
        setPosts(data)
      }
    }, 2000);
  }, []);

  const renderTags = (tags: string[]) => {
    return tags.map(tag => (
      <Chip
        key={tag}
        variant="flat"
        className="max-w-[calc(100%-8px)] h-7"
      >
        <span className="truncate">{tag}</span>
      </Chip>
    ))
  }

  const renderCell = useCallback((post: any, columnKey: string) => {
    // @ts-ignore
    const cellValue = post[columnKey];
    switch (columnKey) {
      case "title":
        return (
          cellValue
        );
      case "author":
        return (
          <span className="whitespace-nowrap ">{cellValue.username}</span>
        );
      case "category":
        return (
          cellValue.title
        );
      case "tags":
        return (
          <div className="flex gap-2 flex-wrap">
            {renderTags(post.tags)}
          </div>
        );
      case "published":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={
              cellValue === true
                ? "success"
                : "danger"
            }
          >
            <span className="capitalize text-xs">{cellValue ? 'Publicado' : 'Não Publicado'}</span>
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center justify-end gap-4 ">
            <div>
              <Tooltip
                content="Editar Post"
                color="danger"
              >
                <button>
                  <Link href={`/dashboard/posts/edit/${post.slug}`}>
                    <EditIcon size={20} fill={resolvedTheme === "dark" ? "#aaa" : "#222"} />
                  </Link>
                </button>
              </Tooltip>
            </div>
            <div>
              <Delete
                title="Deletar Post"
                description="Você está prestes a deletar um post"
                submit={() => handleDelete(post.id)}
              />
            </div>
          </div>
        );
      default:
        return cellValue;
    }
  }, [])

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
          <span> Posts</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Posts</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            onChange={onChange}
            placeholder="Procurar Post"
          />
        </div>
        {(user && user.role) === 'ADMIN' && (
          <div className="flex flex-row gap-3.5 flex-wrap">
            <Button color="primary">
              <Link href="/dashboard/posts/new">
                Adicionar Post
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper data={posts} columns={columns} renderCell={renderCell} />
      </div>
    </div>
  );
};
