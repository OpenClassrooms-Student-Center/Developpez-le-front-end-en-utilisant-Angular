import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./component/error.component";
import { NgModule } from "@angular/core";

const route : Routes = [
    { path: '', component: ErrorComponent}
]

@NgModule({
    imports : [RouterModule.forChild(route)],
    exports : [RouterModule]
})
export class ErrorRoutingModule {}