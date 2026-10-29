import "./styles/SectionHeader.css";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionHeader = ({ tag, title, className = "" }: SectionHeaderProps) => {
  return (
    <div className={`section-header-block ${className}`}>
      <div className="section-header-left">
        <div className="section-tag-badge">
          <span className="section-tag-dot" aria-hidden="true" />
          <span className="section-tag-text">{tag}</span>
        </div>
        <h2 className="section-title-heading">{title}</h2>
      </div>
    </div>
  );
};

export default SectionHeader;
