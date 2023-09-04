import {
	translatedSkill,
	translatedTalent,
	translatedDuration,
	translatedHitLocation,
	translatedCareerClass,
	translatedGender,
	translatedSpec,
	translatedExceptions
} from "./wfrp4-data";

export function init() {
	if (typeof Babele === "undefined") {
		new Dialog({
			title: "Перевод WFRP4",
			content: `<p>Для перевода системы WFRP4 требуется установить и активировать модули <b>Babele и libWrapper</b><p>`,
			buttons: {
				done: {
					label: "Хорошо"
				}
			}
		}).render(true);
	} else {
		Babele.get().register({
			module: "ru-ru",
			lang: "ru",
			dir: "compendium/wfrp4e"
		});

		Babele.get().registerConverters({
			convertSkill: (skills) => {
				return translateDoubleArray(skills, translatedSkill, translatedSpec);
			},

			convertTalent: (talents) => {
				return translateDoubleArray(talents, translatedTalent, translatedSpec);
			},

			convertDuration: (duration) => {
				return translateValue(duration, translatedDuration);
			},

			convertHitLocation: (hitLocation) => {
				return translateValue(hitLocation, translatedHitLocation);
			},

			convertCareerClass: (careerClass) => {
				return translateValue(careerClass, translatedCareerClass);
			},

			convertGender: (gender) => {
				return translateValue(gender, translatedGender);
			}
		});

		Hooks.once("ready", () => {
			patchWfrpConfig();

			function patchWfrpConfig() {
				const WFRP4E = {};

				// Weapon Types
				WFRP4E.weaponTypes = {
					melee: "Оружие ближнего боя",
					ranged: "Дистанционное оружие"
				};

				// Premium Modules
				WFRP4E.premiumModules = {
					"wfrp4e": "Система WFRP4e",
					"wfrp4e-core": "Книга правил",
					"wfrp4e-starter-set": "Стартовый набор",
					"wfrp4e-rnhd": "Неспокойные ночи и трудные дни",
					"wfrp4e-eis": "Враг в тенях",
					"wfrp4e-ua1": "Приключения в Убершрейке I",
					"wfrp4e-dotr": "Смерть на Рейке",
					"wfrp4e-middenheim": "Мидденхайм: город Белого волка",
					"wfrp4e-archives1": "Архивы Империи I",
					"wfrp4e-pbtt": "Власть за троном",
					"wfrp4e-altdorf": "Альтдорф: корона Империи",
					"wfrp4e-ua2": "Приключения в Убершрейке II",
					"wfrp4e-owb1": "Приключения в Старом Свете I",
					"wfrp4e-horned-rat": "Рогатая крыса",
					"wfrp4e-empire-ruins": "Империя в руинах",
					"wfrp4e-archives2": "Архивы Империи II",
					"wfrp4e-up-in-arms": "К оружию!",
					"wfrp4e-wom": "Ветра магии",
					"wfrp4e-zoo": "Имперский зверинец",
					"wfrp4e-salzenmund": "Сальзмунд: город соли и серебра"
				};

				// Range Test Modifiers
				// тут нужен перевод левой части???
				WFRP4E.rangeModifiers = {
					"Point Blank": "easy",
					"Short Range": "average",
					"Normal": "challenging",
					"Long Range": "difficult",
					"Extreme": "vhard"
				};

				// Ranges
				WFRP4E.rangeBands = {
					pb: "Point Blank",
					short: "Short Range",
					normal: "Normal",
					long: "Long Range",
					extreme: "Extreme"
				};

				// Species
				WFRP4E.species = {
					human: "Человек",
					dwarf: "Гном",
					halfling: "Полурослик",
					helf: "Высший эльф",
					welf: "Лесной эльф"
				};

				// Subspecies
				WFRP4E.subspecies = {
					human: {
						reiklander: {
							name: "Рейкландец",
							skills: [
								"Обращение с животными",
								"Обаяние",
								"Хладнокровие",
								"Оценка",
								"Сплетничество",
								"Торговля",
								"Язык (бретонский)",
								"Язык (вестерландский)",
								"Лидерство",
								"Знание (Рейкланд)",
								"Рукопашный бой (основное)",
								"Стрельба (луки)"
							],
							talents: ["Роковое Пророчество", "Смекалка, Учтивость", 3]
						}
					}
				};

				// Species Skills
				WFRP4E.speciesSkills = {
					human: [
						"Обращение с животными",
						"Обаяние",
						"Хладнокровие",
						"Оценка",
						"Сплетничество",
						"Торговля",
						"Язык (бретонский)",
						"Язык (вестерландский)",
						"Лидерство",
						"Знание (Рейкланд)",
						"Рукопашный бой (основное)",
						"Стрельба (луки)"
					],
					dwarf: [
						"Кутёж",
						"Хладнокровие",
						"Стойкость",
						"Артистизм (сказительство)",
						"Оценка",
						"Запугивание",
						"Язык (кхазалид)",
						"Знание (гномы)",
						"Знание (геология)",
						"Знание (металлургия)",
						"Рукопашный бой (основное)",
						"Ремесло (любое)"
					],
					halfling: [
						"Обаяние",
						"Кутёж",
						"Уклонение",
						"Азартные игры",
						"Торговля",
						"Интуиция",
						"Язык (мутландский)",
						"Знание (Рейкланд)",
						"Наблюдательность",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)"
					],
					helf: [
						"Хладнокровие",
						"Артистизм (пение)",
						"Оценка",
						"Язык (эльтарин)",
						"Лидерство",
						"Рукопашный бой (основное)",
						"Ориентирование",
						"Наблюдательность",
						"Музицирование (любое)",
						"Стрельба (луки)",
						"Хождение под парусом",
						"Плавание"
					],
					welf: [
						"Атлетика",
						"Лазание",
						"Стойкость",
						"Артистизм (пение)",
						"Запугивание",
						"Язык (эльтарин)",
						"Рукопашный бой (основное)",
						"Выживание",
						"Наблюдательность",
						"Стрельба (луки)",
						"Скрытность (дикая природа)",
						"Выслеживание"
					]
				};

				// Species Talents
				WFRP4E.speciesTalents = {
					human: ["Роковое Пророчество", "Смекалка, Учтивость", 3],
					dwarf: [
						"Устойчивость к магии",
						"Сумеречное зрение",
						"Грамотность, Непреклонность",
						"Целеустремлённость, Твёрдость духа",
						"Бугай",
						0
					],
					halfling: [
						"Обострённое восприятие (Вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						2
					],
					helf: [
						"Обострённое восприятие (Зрение)",
						"Самообладание, Смекалка",
						"Сумеречное зрение",
						"Второе зрение, Шестое чувство",
						"Грамотность",
						0
					],
					welf: [
						"Обострённое восприятие (Зрение)",
						"Здоровяк, Второе зрение",
						"Сумеречное зрение",
						"Грамотность, Закалка",
						"Скиталец",
						0
					]
				};

				for (let obj in WFRP4E) {
					for (let el in WFRP4E[obj]) {
						if (typeof WFRP4E[obj][el] === "string") {
							WFRP4E[obj][el] = game.i18n.localize(WFRP4E[obj][el]);
						}
					}
				}

				mergeObject(game.wfrp4e.config, WFRP4E);
			}
		});

		Hooks.on("setup", () => {
			/* RNHD */
			if (game.modules.get("wfrp4e-rnhd")?.active) {
				game.wfrp4e.config.species = {
					human: "Человек",
					dwarf: "Гном",
					halfling: "Полурослик",
					helf: "Высший эльф",
					welf: "Лесной эльф",
					gnome: "Карлик"
				};

				game.wfrp4e.config.speciesSkills["gnome"] = [
					"Артистизм (любое)",
					"Выживание",
					"Концентрация (Улгу)",
					"Кутёж",
					"Обаяние",
					"Скрытность (любое)",
					"Сплетничество",
					"Торговля",
					"Уклонение",
					"Язык (вестерландский)",
					"Язык (гасалли)",
					"Язык (магический)"
				];

				game.wfrp4e.config.speciesTalents["gnome"] = [
					"Единение с Улгу, Простолюдин",
					"Имитатор, Фортуна",
					"Сумеречное зрение",
					"Грамотность, Рыбак",
					"Второе зрение, Шестое чувство",
					"Небольшой",
					0
				];
			}

			/* ARCHIVES I */
			if (game.modules.get("wfrp4e-archives1")?.active) {
				game.wfrp4e.utility.mergeCareerReplacements({
					welf: {
						"Охотник за головами": ["Призрачный скиталец"]
					},
					halfling: {
						"Дорожный стражник": ["Интендант"],
						"Солдат": ["Барсучий наездник"]
					},
					dwarf: {
						Посыльный: ["Рейнджер карака"]
					}
				});

				game.wfrp4e.config.subspecies["welf"]["harioth"] = {
					name: "Хариоты",
					talents: [
						"Обострённое восприятие (зрение)",
						"Здоровяк, Второе зрение",
						"Сумеречное зрение",
						"Грамотность, Закалка",
						"Скиталец",
						"Молодая кровь",
						0
					]
				};

				game.wfrp4e.config.subspecies["welf"]["toriour"] = {
					name: "Ториур"
				};

				game.wfrp4e.config.subspecies["welf"]["faniour"] = {
					name: "Фаниур"
				};

				game.wfrp4e.config.subspecies["halfling"]["ashfield"] = {
					name: "Эшфилд",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Хладнокровие",
						"Интуиция",
						"Язык (мутландский)",
						"Стрельба (любое)"
					],
					talents: [
						"Обострённое восприятие (Taste)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Обострённое восприятие (зрение), Этикет (солдаты)",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["brambledown"] = {
					name: "Бремблдаун",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Язык (мутландский) ",
						"Ориентирование",
						"Выживание ",
						"Плавание"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Общительность, Бывалый путешественник",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["brandysnap"] = {
					name: "Брендиснап",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Обращение с животными",
						"Азартные игры",
						"Язык (мутландский)",
						"Знание (травы)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Умелец (фермер), Бугай",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["hayfoot"] = {
					name: "Хайфут",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Азартные игры",
						"Торговля",
						"Оценка",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Коммерсант, Этикет (гильдейцы)",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["hollyfoot"] = {
					name: "Холлифут",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Подкуп",
						"Торговля",
						"Сплетничество",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Умелец (любое), Ловкие пальцы",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["hayfoot—hollyfoot"] = {
					name: "Хайфут-Холлифут",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Подкуп",
						"Торговля",
						"Сплетничество",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Спорщик, Нумизмат",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["lostpockets"] = {
					name: "Лостпокетс",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Стойкость",
						"Азартные игры",
						"Сплетничество",
						"Интуиция"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Здоровяк, Каменный суп",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["lowhaven"] = {
					name: "Лоухевен",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Подкуп",
						"Торговля",
						"Запугивание",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Преступник, Этикет (преступники или гильдейцы)",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["rumster"] = {
					name: "Румстер",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Стойкость",
						"Сплетничество",
						"Торговля",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Умелец (повар), Коммерсант",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["skelfsider"] = {
					name: "Скелфсайдер",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Стойкость",
						"Азартные игры",
						"Сплетничество",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Простолюдин, Этикет (Servants)",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["thorncobble"] = {
					name: "Торнкоббл",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Сплетничество",
						"Лидерство",
						"Знание (геральдика)",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Этикет (дворяне или книгочеи), Грамотность",
						1
					]
				};

				game.wfrp4e.config.subspecies.halfling["tumbleberry"] = {
					name: "Тамблберри",
					skills: [
						"Обаяние",
						"Кутёж",
						"Торговля",
						"Знание (Рейкланд)",
						"Ловкость рук",
						"Скрытность (любое)",
						"Ремесло (повар)",
						"Сплетничество",
						"Торговля",
						"Знание (любое)",
						"Язык (мутландский)"
					],
					talents: [
						"Обострённое восприятие (вкус)",
						"Сумеречное зрение",
						"Устойчивость (Хаос)",
						"Небольшой",
						"Этикет (бюргеры или гильдейцы), Грамотность",
						1
					]
				};
			}

			/* MIDDENHEIM */
			if (game.modules.get("wfrp4e-middenheim")?.active) {
				game.wfrp4e.config.symptoms["homicidalRaging"] = "Убийственная ярость";

				game.wfrp4e.config.symptomDescriptions["homicidalRaging"] =
					"Вы полны ярости и жажды растерзать любого, с кем столкнетесь. На вас действуют правила @Compendium[wfrp4e-core.traits.aE3pyW20Orvdjzj0]{Ненависти (Все живые существа)} и @Compendium[wfrp4e-core.traits.yRhhOlt18COq4e1q]{Ярости} (за исключением того что Ярость не мешает вам быть объектов Ненависти). Жажда причинять вред всему живому настолько непреодолима, что проверки, чтобы избежать эффектов ненависти, необходимо совершать каждые пять раундов, что вы можете поддаться ей даже после прохождения первоначальных психологических проверок. Если вы пройдете психологическую проверку, чтобы избежать эффектов Ненависти, вы достаточно ясно мыслите, чтобы иметь возможность элементарно взаимодействовать с другими живыми существами. Это взаимодействие ограничивается бегством от них или предупреждением их о исходящей от вас опасности, чтобы они убрались с вашего пути.";

				game.wfrp4e.config.subspecies.human["middenheimer"] = {
					name: "Мидденхеймец",
					skills: [
						"Артистизм (любое)",
						"Взяткодатель",
						"Знание (Мидденхейм)",
						"Лидерство",
						"Обаяние",
						"Оценка",
						"Ремесло (выбрать одно)",
						"Рукопашный бой (основное)",
						"Сплетничество",
						"Стрельба (луки)",
						"Торговля",
						"Хладнокровие"
					],
					talents: ["Роковое пророчество", "Этикет (выбрать группу), Сильная спина", 3]
				};

				game.wfrp4e.config.subspecies.human["middenlander"] = {
					name: "Мидденландец",
					skills: [
						"Выживание",
						"Запугивание",
						"Знание (Мидденланд)",
						"Лидерство",
						"Обращение с животными",
						"Оценка",
						"Рукопашный бой (основное)",
						"Сплетничество",
						"Стрельба (луки)",
						"Торговля",
						"Хладнокровие",
						"Язык (вестерландский)"
					],
					talents: [
						"Роковое пророчество, @Table[talents]{Случайный талант}",
						"Грозный вид, Прирождённый воин",
						3
					]
				};

				game.wfrp4e.config.subspecies.human["nordlander"] = {
					name: "Нордландец",
					skills: [
						"Знание (Нордланд)",
						"Кутёж",
						"Оценка",
						"Плавание",
						"Ремесло (выбрать одно)",
						"Рукопашный бой (основное)",
						"Сплетничество",
						"Стрельба (луки)",
						"Торговля",
						"Хождение под парусом (любое)",
						"Язык (вестерландский)",
						"Язык (норс)"
					],
					talents: [
						"Роковое пророчество, @Table[talents]{Случайный талант}",
						"Рыбак, Скиталец",
						"Отважное сердце, Закалка",
						2
					]
				};
			}

			/* UP IN ARMS */
			if (game.modules.get("wfrp4e-up-in-arms")?.active) {
				game.wfrp4e.config.hitLocationTables["quadruped"] = "Четвероногие";

				game.wfrp4e.config.groupAdvantageActions = [
					{
						cost: 1,
						name: "Таран",
						description:
							"При столкновении с более умелым противником, иногда грубая сила оказывается лучше иных подходов..",
						effect:
							"<strong>Специальное действие</strong>: Совершите Встречную Проверку вашей Силы с Силой оппонента. -Если вы побеждаете, противник получает +1 Преимущество и оказывается сбит с ног. -Если противник побеждает, он получает +1 Преимущество и ваш ход заканчивается. -Победа во встречной проверке при совершении этого маневра не дает Преимуществ.",
						test: {
							type: "characteristic",
							value: "s"
						}
					},
					{
						cost: 1,
						name: "Грязный прием",
						description:
							"Бросок песка в глаза или удачно подвернувшийся под руку горящий фонарь могут оказаться решающими в бою.",
						effect:
							"<strong>Специальное действие</strong>: Совершите Встречную Проверку вашего Проворства с Проворством оппонента.<br />-Если вы побеждаете, вы получаете +1 Преимущество. Если Мастер посчитает это уместным, вы также можете наложить на противника один из следующих статусов: @Condition[Охвачен Огнем], @Condition[Ослеплен] или @Condition[Обездвижен]. <br />-Если противник побеждает, он получает +1 Преимущество и ваш ход заканчивается. <br />-Мастер может отказать в наложении конкретных статусов если рядом нет подходящего предмета, или если этот статус уже был наложен на этого же противника с помощью Грязного Приема.<br />-Победа во встречной проверке при совершении этого маневра не дает Преимуществ.",
						test: {
							type: "characteristic",
							value: "ag"
						}
					},
					{
						cost: 2,
						name: "Дополнительное усилие",
						description:
							"Даже в отчаянной ситуации хорошая позиция может оказаться залогом успеха.",
						effect:
							"<strong>Свободное действие</strong>: Вы получаете модификатор +10 к любому тесту (заявляется до броска). За каждое дополнительное Преимущество, затраченное на это же Дополнительное усилие сверх необходимых двух, модификатор повышается на +10. Т.е. можно затратить 3 преимущества для получения модификатора +20, 4 – для  получения +30, и т.д. <br />-Тест с Дополнительным усилием никогда не дает Преимуществ при его совершении."
					},
					{
						cost: 2,
						name: "Отступление",
						description: "Тактическое преимущество так же важно в отступлении, как и в атаке.",
						effect:
							"<strong>Перемещение</strong>: Вы можете отступить из ближнего боя так, как будто вы не связаны им. Это заменяет правила @UUID[Compendium.wfrp4e-core.journal-entries.NS3YGlJQxwTggjRX.JournalEntryPage.bdfiyhEYtKs7irqc#disengaging]{Выхода из Ближнего боя} за Преимущества, описанное в Основной Книге Правил на стр. 165."
					},
					{
						cost: 4,
						name: "Дополнительное действие",
						description:
							"В решающий момент боя дозволяется пожертвовать превосходством, чтобы совершить нечто особенное. ",
						effect:
							"<strong>Свободное действие</strong>: Вы можете совершить дополнительное Действие. Это действие никогда не дает Преимуществ при его совершении. В ход можно совершить до одного Дополнительного действия путем траты Преимуществ."
					}
				];

				game.wfrp4e.config.subspecies.human["tilean"] = {
					name: "Тилиец",
					skills: [
						"Знание (Тилия)",
						"Обаяние",
						"Оценка",
						"Рукопашный бой (основное)",
						"Сплетничество",
						"Стрельба (арбалеты)",
						"Торговля",
						"Хладнокровие",
						"Хождение под парусом (любое)",
						"Язык (аравийский)",
						"Язык (рейкшпиль)",
						"Язык (эсталийский)"
					],
					talents: ["Спорщик, Рыбак", "Самообладание, Учтивость", 3]
				};

				game.wfrp4e.config.subspecies.human["imperial-tilean"] = {
					name: "Имперский тилиец",
					skills: [
						"Обращение с животными",
						"Обаяние",
						"Хладнокровие",
						"Оценка",
						"Сплетничество",
						"Торговля",
						"Язык (бретонский)",
						"Язык (Тилейский)",
						"Лидерство",
						"Знание (Рейкланд)",
						"Рукопашный бой (основное)",
						"Стрельба (луки)"
					],
					talents: ["Роковое пророчество", "Смекалка, Учтивость", 3]
				};

				game.wfrp4e.utility.mergeCareerReplacements({
					"human": {
						"Инженер": ["Артиллерист"],
						"Учёный": ["Картограф"],
						"Коробейник": ["Маркитант"],
						"Кавалерист": ["Лёгкий всадник"],
						"Рыцарь": [
							"Вольный рыцарь",
							"Рыцарь Сияющего Солнца",
							"Рыцарь Белого волка",
							"Рыцарь пантеры"
						],
						"Солдат": [
							"Лучник",
							"Алебардист",
							"Стрелец",
							"Доппельзольднер",
							"Пикенёр",
							"Специалист по осадам"
						],
						"Жрец-воин": ["Священник Мирмидии"]
					},
					"dwarf": {
						Инженер: ["Артиллерист"],
						Учёный: ["Картограф"],
						Коробейник: ["Маркитант"],
						Солдат: ["Алебардист", "Стрелец", "Специалист по осадам"]
					},
					"helf": {
						Учёный: ["Картограф"],
						Коробейник: ["Маркитант"],
						Кавалерист: ["Лёгкий всадник"],
						Солдат: ["Лучник", "Специалист по осадам"]
					},
					"welf": {
						Учёный: ["Картограф"],
						Коробейник: ["Маркитант"],
						Солдат: ["Лучник"]
					},
					"halfling": {
						Инженер: ["Артиллерист"],
						Учёный: ["Картограф"],
						Коробейник: ["Маркитант"],
						Солдат: ["Лучник", "Алебардист", "Стрелец"]
					},

					"human-tilean": {
						Флагеллант: ["Монах", "Жрец"]
					}
				});
			}
		});

		function translateValue(value, obj) {
			return obj[value] || value;
		}

		function translateArray(arr, obj) {
			return arr.map((item) => obj[item] || item);
		}

		function translateDoubleArray(arr, leftTranslation, rightTranslation) {
			function translateItem(item) {
				if (item in translatedExceptions) {
					return translatedExceptions[item];
				}

				const regex = /\(([^)]+)\)/;
				const leftPart = item.replace(regex, "").trim();
				const rightPart = item.match(regex);

				if (rightPart) {
					const rightValue = rightPart[1].trim();
					const translatedLeftPart = leftTranslation[leftPart] || leftPart;
					const translatedRightValue = rightTranslation[rightValue] || rightValue;
					return `${translatedLeftPart} (${translatedRightValue})`;
				} else {
					const translatedLeftPart = leftTranslation[leftPart] || leftPart;
					return translatedLeftPart;
				}
			}

			return arr.map(translateItem);
		}
	}
}
