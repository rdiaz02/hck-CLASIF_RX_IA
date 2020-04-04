library(dplyr)
library(lubridate)
time_data <- read.csv("example-timeline-data.csv", header = TRUE)
as.POSIXct(time_data[, "Fecha"], tz = Sys.timezone())
classif_data <- data.frame(Fecha = c("17/03/2020", "19/03/2020", "03/04/2020"),
                           Sano = c(60, 50, 30),
                           Covid = c(45, 25, 10))

d1 <- dplyr::full_join(time_data, classif_data, by = "Fecha")
d2 <- d1
d2$Fecha <- as.POSIXct(d2[, "Fecha"], tz = Sys.timezone())
d2$Fecha2 <- lubridate::dmy(d2$Fecha)
d3 <- dplyr::arrange(d2, Fecha2)
d3$Fecha3 <- as.Date(d3$Fecha2, "%Y-%m-%d")

dyd <- 0.9 ## stretch downwards
d4 <- d3[!is.na(d3$Covid), ]

png(file = "example-output-1.png", width = 1000, height = 1000)
par(cex = 2)
plot(Covid ~ Fecha2, data = d4, type = "b", xaxt = "n",
     xlab = "Fecha", ylab = "Neumonia compatible COVID-19, %",
     xlim = c(min(d3$Fecha2), max(d3$Fecha2)),
     ylim = c(dyd * min(Covid), max(Covid)))
axis(1, d3$Fecha2, format(d3$Fecha2, "%b %d"), cex.axis = .7, las = 2)
d5 <- d3[!is.na(d3$Evento), ]
text(d5$Fecha2,
     1.1 * min(d3$Covid, na.rm = TRUE),
     ##0.5 * (max(d3$Covid, na.rm = TRUE) + min(d3$Covid, na.rm = TRUE)),
     labels = d5$Evento,
     srt = 90,
     pos = 3,
     offset = 1,
     ## adj = c(0.5, 0),
     cex = 0.7)
dev.off()

