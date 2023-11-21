import React, { useEffect } from 'react'
import './ContactDesign.css'
import { useTranslation } from 'react-i18next';

const ContactDesign = () => {
    const { t } = useTranslation();

    const revealItems = () => {
        const shopItems = document.querySelectorAll('.contact-design-wrapper');
        shopItems.forEach(item => {
            item.classList.add('revealContactItem');
        });

    }

    useEffect(() => {
        setTimeout(()=>{
            revealItems();

        },100)
    },[])

    return (
        <div className='contact-design-main'>
            <div className='contact-design-wrapper'>
                <div className='contact-design-left'>
                    <div className='contact-info-wrapper'>
                        <div className='inline-wrapper'>
                        <h1 className='contactheader'>{t('contact')}</h1>
                        <div className='contact-wrapper1'>
                            <p className='contact-paragraph'>Jasha Brewing d. o. o.</p>
                            <p className='contact-paragraph'>Lendavsko naselje 1</p>
                            <p className='contact-paragraph'>9000 Murska Sobota</p>
                            <p className='contact-paragraph'>{t('slovenia')}</p>
                        </div>
                        <div className='contact-wrapper2'>
                            <p className='contact-paragraph'>tel: +386 (0)31 222 222</p>
                            <p className='contact-paragraph'>e-mail: info@jashabrewing.com</p>
                            
                        </div>
                        <div className='contact-wrapper3'>
                            <p className='contact-paragraph'>{t('brewery2')}: 031 222 223</p>
                            
                        </div>
                        </div>
                    </div>
                </div>
                <div className='contact-design-right'>
                    <iframe
                        title='Google Map'
                        width='100%'
                        height='100%'
                        frameBorder='0'
                        style={{ border: '0' }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2219.4108868532074!2d16.150130316126457!3d46.670777710373065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f82b6d1c89c9f%3A0xd14c14b45a145f24!2sPle%C5%A1e%202%2C%20900%20Murska%20Sobota!5e0!3m2!1sen!2ssi!4v1662237756607!5m2!1sen!2ssi"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

        </div>
    )
}

export default ContactDesign
