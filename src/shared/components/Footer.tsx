import React from 'react';
import SectionBlock from './SectionBlock';
import SocialButton from './SocialButton';  // Новый импорт!

const classNames = {
  contactList: 'flex flex-col gap-4 text-lg',
};

const Footer: React.FC = () => {
  return (
    <SectionBlock id="contact" title="Contact">
      <div className={classNames.contactList}>
        <SocialButton platform="telegram" username="rnakarov" href="https://t.me/rnakarov" />
        <SocialButton platform="instagram" username="rnakarov" href="https://instagram.com/rnakarov" />
        <SocialButton platform="github" username="sayces" href="https://github.com/sayces" />
      </div>
    </SectionBlock>
  );
};

export default Footer;