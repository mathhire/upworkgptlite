import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoadingServiceComponent } from '../loading-service/loading-service.component';
import { ResponseContentComponent } from '../response-content/response-content.component';

interface Card {
  title: string;
  link: string;
  description: string;
  shortDescription?: string;
  showFullDescription?: boolean;
}

interface Message {
  role: string;
  content: string;
}

interface Choice {
  message: Message;
  finish_reason: string;
  index: number;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface GPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: Usage;
  choices: Choice[];
}

@Component({
  selector: 'app-generateproposal',
  templateUrl: './generateproposal.component.html',
  styleUrls: ['./generateproposal.component.css']
})


export class GenerateproposalComponent {


  constructor(private http: HttpClient, public dialog: MatDialog){

    const FETCH_INTERVAL = 60000//fetch every 60 seconds
    interval(FETCH_INTERVAL).pipe(
      startWith(0),
      switchMap(() => this.getRSS())
    ).subscribe(data => {
      this.filterCards(data)
    })
  }

  public GPTMessage: string = "\n\nThis is a test! This is a very long test with lots of new lines and other things involed \n there should bea  new line here and now there will be a double new line \n \n two new lines!!";

  isloading = false;
  cards : Card[] =[


  ]
  displayFilteredCards : Card[] =[


  ]
  currentDialogRef: any = null

  // availableProject: iProject[] = [
  //   {
  //     projectName: '',
  //     frameWork: '',
  //     description: '',
  //     _id: '',
  //   },
  // ];

// fill out available projects here
  availableProject: any = [
    {
      projectName: 'TrainGRC',
      frameWork: 'Wordpress, React, Android, IOS',
      description: 'Description test test test',
      _id: '',
    },
  ];


  testLoading() {
    console.log('data isloading is ', this.isloading)
    const dialogRef = this.dialog.open(LoadingServiceComponent, {
      data: this.isloading
    })
    this.currentDialogRef = dialogRef
  }
  testModal() {
    this.dialog.open(ResponseContentComponent, {
      data: this.GPTMessage
    })
  }
  generateProposal(description: string){
    let avproj: any = this.availableProject
    let availableProjectString = JSON.stringify(avproj)
    let div = document.createElement('div');
    div.innerHTML = description
    let unparsedDescription = div.textContent || div.innerText || ';'
    let parsedDescription = unparsedDescription.replace('Click Here To Apply', '').replace(/Hourly Range:[\s\S]*/g, '');
    let url = 'https://api.openai.com/v1/chat/completions'
      //Place GPT Prompt here
    let sysRole = `You are writing proposals for an upwork account. I will give you the job title and description and you will return the proposal.\n\nYour proposal should include the following sections but be written in natural language. Don't label each section, instead organize the proposal to hit on all the key points with natural flow between sections.  The proposal should always start with Hi [Name].\n\n1.) Introduction (Include any required words, instill confidence that you can complete the project, mention that you have a great team making sure to mention roles that are relevant to the posting. For example, a proposal for a flutter project should mention UX/UI desginers, flutter developers, etc)\n\n2.) Proof (This is where you will show the potential client 2 of your past projects, making sure to mention: the clients goals for the project, details about your contribution to the project (your contribution should be the same as what the client is asking for, if their expectations are unclear then generate a contribution that makes sense), and a summary of the project. Pick a project from the following array of projects. Each item in the array contains an object that will give you all the information you need. ${availableProjectString}\n\n\n3.) Assurance (this is where you will assure the prospective client that you can complete this project and that you have worked on very similar projects in the past and are knowledgeable about the problems they may run into and how to solve them)\n\n3.) call to action (this is where you will ask the potential client to list 3 times along with a timezone to get on a call and discuss their project. mention in natural language that you are so confident that they will receive value from the call that you are offering them a value assurance. If they do not receive value from the call you will pay them at their hourly rate.)\n\nThe entirety of this proposal should be written at the 6th grade level and not have long complex sentences. It should have an exciting tone. You are writing from the perspective of a freelancer who is there to help the potential client on their journey or business. Make sure to write in an engaging way that feels friendly and authentic. Do not use passive language, but instead use active language.\n\nDo not label each section of the proposal, instead let it flow together naturally. This means do not use proof: before the proof section assurance: before the assurance section etc. \n\nCertain keywords in the title should trigger you to offer certain assurances you can find the assurances in this array of objects\n[\n{\ntrigger: IOS\nAssurance: we are familiar with all the steps that need to be taken to launch an app on the appstore, including compliance, review, and code standards\n},\n]`
    console.log(sysRole)
    console.log(availableProjectString)
    let body =  {
      "model": "gpt-3.5-turbo",
     "messages": [
         {"role": "system", "content": sysRole},
         {"role": "user", "content": parsedDescription },
     ],
     "temperature": 1,
     "max_tokens": 2048,
     "top_p": 1,
     "frequency_penalty": 0,
     "presence_penalty": 0.05,


  }
    let headers = {
      Authorization: "Bearer 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"
    }


    // let url = "https://upworkgpt-0871094386f6.herokuapp.com/generate-proposal"


    this.isloading = true;
    this.testLoading()
    this.http.post<Object>(url, body, {headers}).subscribe(
       (response: any) => {
        this.GPTMessage = response.choices[0].message.content
        this.isloading = false;
        if(this.currentDialogRef === true){
          this.currentDialogRef.close()
        }
        return this.testModal()

        }

    )


  }
  filterCards(cards: Card[]) {
    let excludedFilterWords = ["kajabi", "shopify", "3d", "join",]
    let filterwords: string[] = ["experience", ".com", "developer", "based", "clients", "customers", "manage", "management", "marketing", "patient", "information", "billing", "support", "quality", "design", "filters", "profiles", "preferences", "tools", "developed", "company", "knowledge", "skills", "expertise", "familiarity", "practice", "exposure", "customers", "patrons", "consumers", "users", "accounts", "founded", "located", "established", "rooted", "grounded", "standard", "caliber", "grade", "excellence", "value", "created", "built", "constructed", "designed", "advanced", "business", "corporation", "firm", "enterprise", "organization", "programmer", "coder", "engineer", "designer", "creator", "bio", "summary", "account", "description", "overview"]
    let lowerCaseFilterWords = filterwords.map(filterword => filterword.toLowerCase());
    let filteredCards = cards.filter(card => {
      let wordsInDescription = card.description.toLowerCase().split(" ");
      return wordsInDescription.some(word => lowerCaseFilterWords.includes(word))
      && !wordsInDescription.some(word => excludedFilterWords.includes(word))
      && card.description.length >= 350;
    })
    console.log(filteredCards)
    this.displayFilteredCards = filteredCards
  }

  toggleDescription(card: any): void {
    card.showFullDescription = !card.showFullDescription
  }
  toggleDescriptionFcard(fcard: any): void {
    fcard.showFullDescription = !fcard.showFullDescription
  }

  // getDataHandler() {
  //   let url = 'https://upworkgpt-0871094386f6.herokuapp.com/get-projects';
  //   this.http.get<iProject[]>(url).subscribe((response: iProject[]) => {
  //     this.availableProject = response;
  //   });
  // }

  getRSS(): Observable<any>{
    console.log("fetching data")
    //place RSS feed here
    const url = ""
    return this.http.get(url, {responseType: 'text'}).pipe(
       map((xml: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'application/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        return items.map(item => {
          let description = item.querySelector('description')?.textContent || '';
          return {

            title: item.querySelector('title')?.textContent || '',
            link: item.querySelector('link')?.textContent || '',
            description,
            shortDescription: description.length > 300 ? description.substr(0,300) + '...' : description,
            showFullDescription: false
          };
        });
      })
    );


  }

  ngOnInit(){
    // this.getDataHandler()
  }
}




