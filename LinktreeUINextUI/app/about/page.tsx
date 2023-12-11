import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";

export default function AboutPage() {
	return (
		<div>
			<h1 className={title()}>Create Your Todo!!</h1>
			<form action="" method="post" className="py-20">
				<div className="">
					<label htmlFor="name">Todo   </label>
					<input type="textarea" id="name" />
				</div>
				
				<br></br>
				<div>
					<input type="checkbox" name="imp" id="important" />
					<label htmlFor="">Important</label>
				</div>
				<br></br>
				<div>
					<Button><input type="submit" value="submit"/></Button>
				</div>
			</form>
		</div>
	);
}
