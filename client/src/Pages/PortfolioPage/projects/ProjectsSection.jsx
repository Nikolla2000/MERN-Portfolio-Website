import { Button, Col, Container, Row } from "react-bootstrap";
import portfolioData from "../../../Components/Portfolio/portfolioData";
import ProjectComponent from "./ProjectComponent";
import "./ProjectsSection.scss"


const ProjectsSection = () => {
    return (
        <section className="all-projects-wrapper">
            <Container>
                <Row>
                    {portfolioData.map((project) => (
                        <Col key={project.imgPath} lg={6} md={6} xs={12}>
                            <ProjectComponent data={project} />
                        </Col>
                    ))}
                    <a href="https://github.com/Nikolla2000" 
                        className="viewmore-button mt-5"
                        target="_blank">
                        <Button variant="danger">View more...</Button>
                    </a>
                </Row>
            </Container>
        </section>
    );
};

export default ProjectsSection;