import "./Emoji.css";

interface EmojiProps {
    children: React.ReactNode
}

const Emoji = ({children}: EmojiProps) => {
    return (
        <span className="emoji-font">
            {children}
        </span>
    );
};

export const getFlagEmoji = (countryCode: string): string => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

export default Emoji;