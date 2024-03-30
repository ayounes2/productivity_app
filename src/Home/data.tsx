export const myDomains: Array<DomainProps> = [{
    id: 1,
    name: 'Indoor',
    activities: ['Apex', 'Doto', 'tiktok', 'Apex2', 'Doto2', 'tiktok2', 'Apex3', 'Doto3', 'tiktok3'],
}, {
    id: 2,
    name: 'Outdoor',
    activities: ['Cycling', 'Walk in the Park'],
}, {
    id: 3,
    name: 'test',
    activities: ['Cycling', 'Walk in the Park'],
}];

export type DomainProps = {
    id: number,
    name: string,
    activities: Array<string>
}