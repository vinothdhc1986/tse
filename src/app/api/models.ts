
//region : User releated
export interface userAccount {
	UserID: string,
	EmailID: string,
	CompanyID: string,
	CreatedBy: string,
	CreatedOn: string,
	Role: number,
	Status: number,
	UpdateOn: string,
	UpdateBy: string,
	UserName: string,
	PhoneNumber: string,
	LastActivityOn: string,
	Subscriptions: SubscriptionDetails[],
	MasterProjectsAccess: ProjectAccess[]
}

export interface SubscriptionDetails {
	ModuleID: string,
	SubscribedBy: string,
	SubscribedOn: string,
	Status: number,
	ActivatedOn: string,
	ExpiredOn: string
}

export interface ProjectAccess {
	ProjectID: string,
	AccessType: number
}

//endregion : user releated

//region : Project releated
export interface TTAnalysis {
	TotalTestCases: number,
	Pass: number,
	Fail: number,
	Pending: number,
	NotTested: number
}

export interface L3TTProject {
	ProjectType: number,
	PaymentScheme: number,
	CreatedOn: string,
	CreatedBy: string,
	LastAccessedOn: string,
	LastAccessedBy: string,
	UsedFileID: string,
	TTAnalysis: TTAnalysis,
	Status: number,
}

 export interface MasterProject {
	ProjectID: string,
	ProjectName: string,
	Status: number,
	CreatedBy: string,
	CreatedOn: string,
	LastAccessedOn: string,
	LastAccessedBy: string,
	L3TTProjects: L3TTProject[],
}
//endregion : Project releated

//region : ICS Questionnaire releated
export interface TSEGroup {
	PageNo: number,
	GroupNo: string,
	Prompt: string,
	Help: string,
	Mode: string[],
	Questions: TSECQuestion[]
}

export interface TSECQuestion {
	QuestionName: string,
	Prompt: string,
	Help: string,
	Type: number,
	Modes: QuestionMode[],
	Alloweds: QuestionAllowed[],
	IsCommon: boolean,
	IsRegression: boolean,
	IsOptional: boolean
}

export interface QuestionMode {
	Mode: string,
	Value:string
}

export interface QuestionAllowed {
	Id : string,
	Value: string,
	IsApplicable: boolean
}

//endregion : ICS Questionnaire releated


//region : ICS Questionnaire Answer releated

export interface QuestionAnswer {
	QuestionID: string,
	Answer: string,
	Answers:string[]
}

export interface TSECGroupAnswer {
	PageNo: number,
	QuestionAnswers: QuestionAnswer[]
}

//region : ICS Questionnaire Answer releated