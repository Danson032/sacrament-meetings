
import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-11-08',
        meetingType: 'regular',
        presiding: 'Bishop John Smith',
        conducting: 'Brother James Mwangi',
        announcements: [
            'Ward temple visit on November 15',
            'Youth activity on Saturday'
        ],
        openingHymn: {
            number: 2,
            title: 'The Spirit of God'
        },
        openingPrayer: 'Sister Mary Wanjiku',
        wardBusiness: [
            { description: 'Sustaining of new Primary teachers' }
        ],
        stakeBusiness: false,
        sacramentHymn: {
            number: 169,
            title: 'As Now We Take the Sacrament'
        },
        speakers: [
            {
                name: 'Brother Peter Kamau',
                topic: 'Faith in Jesus Christ',
                type: 'speaker'
            },
            {
                name: 'Sister Grace Njeri',
                topic: 'The Power of Prayer',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 31,
            title: 'O God, Our Help in Ages Past'
        },
        closingPrayer: 'Brother David Kimani'
    },
    {
        id: 2,
        date: '2026-11-01',
        meetingType: 'testimony',
        presiding: 'Bishop John Smith',
        conducting: 'Brother Peter Kamau',
        announcements: ['Ward choir practice on Wednesday'],
        openingHymn: {
            number: 6,
            title: 'Redeemer of Israel'
        },
        openingPrayer: 'Sister Anne Wambui',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 181,
            title: 'Jesus of Nazareth, Savior and King'
        },
        speakers: [],
        closingHymn: {
            number: 85,
            title: 'How Firm a Foundation'
        },
        closingPrayer: 'Brother James Mwangi'
    },
    {
        id: 3,
        date: '2026-10-25',
        meetingType: 'regular',
        presiding: 'Bishop John Smith',
        conducting: 'Brother David Kimani',
        announcements: ['Primary presentation preparation'],
        openingHymn: {
            number: 19,
            title: 'We Thank Thee, O God, for a Prophet'
        },
        openingPrayer: 'Brother Joseph Maina',
        wardBusiness: [
            { description: 'Sustaining of new ward missionaries' }
        ],
        stakeBusiness: true,
        sacramentHymn: {
            number: 185,
            title: 'Reverently and Meekly Now'
        },
        speakers: [
            {
                name: 'Sister Mary Wanjiku',
                topic: 'Service and Love',
                type: 'speaker'
            },
            {
                name: 'Ward Choir',
                topic: 'I Am a Child of God',
                type: 'musical-number'
            }
        ],
        closingHymn: {
            number: 98,
            title: 'I Need Thee Every Hour'
        },
        closingPrayer: 'Sister Grace Njeri'
    },
    {
        id: 4,
        date: '2026-10-18',
        meetingType: 'stake',
        presiding: 'Stake President Mwangi',
        conducting: 'Brother Daniel Kariuki',
        announcements: ['Stake leadership training next Sunday'],
        openingHymn: {
            number: 27,
            title: 'Praise to the Man'
        },
        openingPrayer: 'Brother John Kamau',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: {
            number: 188,
            title: 'Thy Will, O Lord, Be Done'
        },
        speakers: [
            {
                name: 'Stake President Mwangi',
                topic: 'Strengthening Families',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 134,
            title: 'I Believe in Christ'
        },
        closingPrayer: 'Sister Jane Njeri'
    },
    {
        id: 5,
        date: '2026-10-11',
        meetingType: 'general',
        presiding: 'Elder James Mwangi',
        conducting: 'Brother Peter Kamau',
        announcements: ['General conference follow-up discussion'],
        openingHymn: {
            number: 1,
            title: 'The Morning Breaks'
        },
        openingPrayer: 'Sister Anne Wambui',
        wardBusiness: [],
        stakeBusiness: false,
        sacramentHymn: {
            number: 193,
            title: 'I Stand All Amazed'
        },
        speakers: [
            {
                name: 'Elder James Mwangi',
                topic: 'Following Jesus Christ',
                type: 'speaker'
            }
        ],
        closingHymn: {
            number: 96,
            title: 'Dearest Children, God Is Near You'
        },
        closingPrayer: 'Brother David Kimani'
    }
];

export function getMeetings(
    date?: string | null
): SacramentMeeting[] {
    if (date !== undefined && date !== null) {
        return meetings.filter((meeting) => meeting.date === date);
    }

    return meetings;
}

export function getMeetingById(
    id: number
): SacramentMeeting | null {
    return meetings.find((meeting) => meeting.id === id) ?? null;
}
