
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Message = ({ content, isUser, timestamp }: MessageProps) => {
  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2">
          <img src="/placeholder.svg" alt="Hairy AI" className="rounded-full bg-hairy-light p-1" />
        </Avatar>
      )}
      <div>
        <div
          className={cn(
            "max-w-md rounded-2xl px-4 py-3",
            isUser
              ? "bg-hairy-primary text-white"
              : "bg-gray-100 text-gray-800"
          )}
        >
          <p className="text-sm">{content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 ml-2">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80" 
            alt="User" 
            className="rounded-full" 
          />
        </Avatar>
      )}
    </div>
  );
};

export default Message;
