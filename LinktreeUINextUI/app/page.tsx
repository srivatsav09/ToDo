import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip"
import Image from "next/image"
import { siteConfig } from "@/config/site";


/*
	Create a Card for our linktree to live in
	Create a next/image
	Create some chips ( TypeScript, YouTuber, Programmer )
	Create a text description of user
	Create cards for each user link
*/

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-1 py-0 md:py-5 h-full">
			
			{/* <Card isBlurred shadow="lg">
				<CardBody>
					<div className="flex flex-col w-full">
						<div className="flex justify-center">
							<Image 
								src="/CooperCodes.png"
								width={200}
								height={200}
								alt="Cooper Codes Profile Picture"
								className="justify-center rounded-lg border-large"
							/>
						</div>
						<div className="flex justify-center pt-2">
							<h2 className="text-3xl font-bold">Cooper Codes</h2>
						</div>
						<div className="flex justify-center m-4 gap-4">
							<Chip
								variant="shadow"
								color="primary"
								size="sm"
							>
								Next.js 13
							</Chip>
							<Chip
								variant="shadow"
								color="primary"
								size="sm"
							>
								NextUI 
							</Chip>
							<Chip
								variant="shadow"
								color="primary"
								size="sm"
							>
								YouTuber 
							</Chip>
						</div>
						<div className="flex justify-center max-w-sm">
							<p className="text-lg text-center font-semibold">
								I create software engineering tutorials. I also make music in my free time!
							</p>
						</div>
						<div className="flex flex-col justify-center gap-4 pt-4">
							<a href="https://youtube.com/coopercodes" target="_blank">
								<Card className="w-full" isHoverable>
									<CardBody className="p-3">
										<h3 className="self-center text-lg">YouTube</h3>
									</CardBody>
								</Card>
							</a>
							<a href="https://github.com/coopercodes" target="_blank">
								<Card className="w-full" isHoverable>
									<CardBody className="p-3">
										<h3 className="self-center text-lg">GitHub</h3>
									</CardBody>
								</Card>
							</a>
							<a href="https://thecodeletter.com" target="_blank">
								<Card className="w-full" isHoverable>
									<CardBody className="p-3">
										<h3 className="self-center text-lg">The Codeletter</h3>
									</CardBody>
								</Card>
							</a>
						</div>
					</div>
				</CardBody>
			</Card> */}
			<br />
			<Card
      isBlurred
      className="flex flex-col border-none bg-background/60 dark:bg-default-100/30 max-w-[1100px]"
      shadow="sm"
    >
    {/* <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
        <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
		<br />
      </CardHeader> */}
	  <CardBody>
	  <Image
        alt="Card background"
        className="z-0 w-full h-full object-cover"
		src="/wp1.jpg"
		width={900}
		height={900}
      />
	  </CardBody>
      
    </Card>
	<br />
	{/* <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              src="/wp1.jpg"
              width={200}
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
              >hi
              </Button>
            </div>

            <div className="flex flex-col mt-3 gap-1">

            <div className="flex w-full items-center justify-center">
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
              </Button>
              <Button
                isIconOnly
                className="w-auto h-auto data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
              </Button>
              <Button
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
              >
              </Button>
            </div>
          </div>
        </div>
		</div>
      </CardBody>
    </Card> */}
		</section>
	);
}
