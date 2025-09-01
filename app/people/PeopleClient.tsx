'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './people.css';
import worldPin from "@/public/assets/employee.png";
import { IconWorldPin } from '@tabler/icons-react';
import { IconBrandFacebook } from '@tabler/icons-react';
import { IconBrandMeta } from '@tabler/icons-react';
import { IconBrandX } from '@tabler/icons-react';
import { IconBrandTiktok } from '@tabler/icons-react';
import { IconSitemap } from '@tabler/icons-react';
import { IconExchange } from '@tabler/icons-react';
import { IconNotes } from '@tabler/icons-react';
import { IconBrandRedux } from '@tabler/icons-react';
import { IconFocusAuto } from '@tabler/icons-react';

export default function PeopleClient({ people }: { people: any[] }) {
    const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
    console.log("ssssssssss", people)

    // Fix: Set the app element safely once DOM is available
    useEffect(() => {
        Modal.setAppElement('body'); // Or use '#__next' if that works
    }, []);

    const openModal = (person: any) => {
        setSelectedPerson(person);
    };

    const closeModal = () => {
        setSelectedPerson(null);
    };

    const icons = [
        "🏐",
        "👑",
        "🏓",
        "🎧",
        "🍪",
        "🌹",
        "🐨",
        "🐶",
    ]

    let randomIndex;

  return (
    <div>
        <div className="people-image" />
        <div className="people">
            <div className="title">☎️People Directory</div>
            <div className="description">
            <span>Help your team keep track of who's who...</span>
            <span>Emojis and custom database properties can add some personality too!</span>
            <span className="description-third">↓ Click through the different database tabs...</span>
            </div>
        </div>

        <div className="people-grid">
            {people.map((person) => {
                return (
                    <div key={person.sys.id} className="card" onClick={() => openModal(person)}>
                        <img
                        src={person.fields.mainImage.fields.file.url}
                        alt={person.fields.name}
                        className="card-image"
                        />
                        <div className="card-info">
                            <h3>{icons[3]}{person.fields.name}</h3>
                            <span>{person.fields.country}</span>
                            <p>{person.fields.status}</p>
                        </div>
                    </div>
                )}
            )}
        </div>

        <Modal isOpen={!!selectedPerson} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
            {selectedPerson && (
                <div>
                    <button className="close-btn" onClick={closeModal}>✖</button>

                    <div className="icon">{icons[3]}</div>
                    <h2>{selectedPerson.fields.name}</h2>

                    <p><strong><IconWorldPin className="tabler-icon" stroke={2} size={16}/> Location:</strong> <span> {selectedPerson.fields.country} </span></p>
                    <p><strong><IconBrandFacebook stroke={2} size={16}/>Facebook:</strong> <span> {selectedPerson.fields.facebook} </span></p>
                    <p><strong><IconBrandMeta stroke={2} size={16}/>Instagram:</strong><span>  {selectedPerson.fields.instagram} </span></p>
                    <p><strong><IconBrandX stroke={2} size={16}/>Twitter:</strong> <span> {selectedPerson.fields.twitter} </span></p>
                    <p><strong><IconBrandTiktok stroke={2} size={16}/>TikTok:</strong> <span> {selectedPerson.fields.tikTok} </span></p>
                    <p><strong><IconSitemap stroke={2} size={16}/>Website:</strong> <span> {selectedPerson.fields.website} </span></p>
                    <p><strong><IconExchange stroke={2} size={16}/>Other Channels:</strong> <span> {selectedPerson.fields.otherChannels} </span></p>
                    <p><strong><IconBrandRedux stroke={2} size={16}/>Status:</strong> <span> {selectedPerson.fields.status} </span></p>
                    <p><strong><IconFocusAuto stroke={2} size={16}/>Focus Areas:</strong> <span> {selectedPerson.fields.focusAreas?.join(', ')} </span></p>
                    <p><strong><IconNotes stroke={2} size={16}/>Notes:</strong> <span> {selectedPerson.fields.notes} </span></p>
                    <div className="bottom-para">
                        <img
                            src={selectedPerson.fields.mainImage.fields.file.url}
                            alt={selectedPerson.fields.name}
                            className="modal-image"
                        />

                        {/* ✅ Rich Text rendering */}
                        <div>
                            <strong>Description:</strong>
                            {documentToReactComponents(selectedPerson.fields.description)}
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    </div>
  );
}
