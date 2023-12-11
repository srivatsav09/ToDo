import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card"

export default function AboutPage() {
	return (
			<>
			<h1 className={title()}>Create Your Todo!!</h1>
			<section className="flex flex-col items-center justify-center gap-4 py-10 md:py-10 h-full">
			<Card className="border-none bg-red-500 ">
				<CardBody>
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
			</CardBody>
		</Card>
		</section>
		</>
	);
}
