import { Column, Flex, Heading, SmartImage, Text, Button } from "@/once-ui/components";
import { work } from "@/app/resources/content";
import styles from "./Projects.module.scss";

export function Projects() {
  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Heading variant="display-strong-s" marginBottom="l">
        {work.title}
      </Heading>
      <Column fillWidth gap="xl">
        {work.projects.map((project, index) => (
          <Flex
            key={index}
            className={styles.projectCard}
            mobileDirection="column"
            fillWidth
            gap="l"
            padding="l"
            border="neutral-medium"
            radius="m"
          >
            <Flex flex={1} className={styles.imageContainer}>
              <SmartImage
                src={project.image}
                alt={project.title}
                aspectRatio="16/9"
                radius="m"
                className={styles.projectImage}
                enlarge
              />
            </Flex>
            <Column flex={1} gap="m">
              <Heading variant="heading-strong-l">{project.title}</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {project.description}
              </Text>
              <Column gap="s">
                {project.achievements.map((achievement, idx) => (
                  <Text key={idx} variant="body-default-s" onBackground="neutral-weak">
                    • {achievement}
                  </Text>
                ))}
              </Column>
              {project.link && (
                <Button
                  href={project.link}
                  variant="secondary"
                  size="m"
                  suffixIcon="arrowRight"
                  className={styles.projectButton}
                >
                  View Project
                </Button>
              )}
            </Column>
          </Flex>
        ))}
      </Column>
    </Column>
  );
}
