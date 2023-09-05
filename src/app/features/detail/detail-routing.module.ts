import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./components/detail.component";
import { NgModule } from "@angular/core";

const routes : Routes = [
    {path  : '', component : DetailComponent}
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})
export class DetailRoutingModule {}