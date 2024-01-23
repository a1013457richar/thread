import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comment: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comment,
  isComment,
}: Props) => {
  console.log(  community)
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      } mb-4`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-1 w-full flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author?.id}`} className="relative h-11 w-11">
              <Image
                src={author?.image}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </Link>
            <div className="thread-card_bar"></div>
          </div>
          <div className="flex flex-col w-full">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author?.name}
              </h4>
            </Link>
            <p className="text-small-regular text-light-2 mt-2 mb-5">{content}</p>
            <div className={`${isComment && 'mb-10'}mt-10 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
                </Link>
                <Image
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
                <Image
                    src="/assets/share.svg"
                    alt="share"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                />
              </div>
              {comment.length > 0 && isComment&&(
                <Link href={`/thread/${id}`}>
                <p className="mt-1 text-subtle-medium text-gray-1">
                  {comment.length} replies
                </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        {!isComment && comment.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2'>
          {comment.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comment.length} repl{comment.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
      {!community && <p>no </p>}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
      </div>
    </article>
  );
};

export default ThreadCard;
