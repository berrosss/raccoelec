import Image from 'next/image';

const WhatsAppChat = () => {
    return (
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100 }}>
        {/* <a
          href="https://wa.me/1234567890?text=Hi! I need some help."
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/whatsapp_icon.png"
            alt="Chat with us"
            width={60}
            height={60}
          />
        </a> */}
      </div>
    );
  };
  
  export default WhatsAppChat;