# base image
FROM openjdk:11

VOLUME /tmp

# port export
EXPOSE 8080

# variable
ARG JAR_FILE=build/libs/mango-server-1.0-SNAPSHOT.jar

ADD ${JAR_FILE} mango-server.jar

ENTRYPOINT ["java", "-jar", "mango-server.jar"]