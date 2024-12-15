export interface TournamentResponse {
    page:       number;
    perPage:    number;
    totalItems: number;
    totalPages: number;
    items:      TournamentDetail[];
}

export interface TournamentDetail {
    categories:            string[];
    collectionId:          string;
    collectionName:        string;
    contactNumber:         string;
    contactPerson:         string;
    created:               Date;
    description:           string;
    endDate:               Date;
    id:                    string;
    isWaAvailable:         boolean;
    logo:                  string;
    managedBy:             string;
    maxParticipation:      number;
    name:                  string;
    pamflet:               string;
    region:                string;
    registrationEndDate:   Date;
    registrationStartDate: Date;
    slug:                  string;
    sportType:             string;
    startDate:             Date;
    status:                string;
    updated:               Date;
}
