export interface RecentChanges {
    id:number,
    kind:string,
    changes: {
        key:string,
        revision:number

    }[],
    timestamp:string
}