import json
from channels.generic.websocket import AsyncWebsocketConsumer

class CalculationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.process_id = self.scope["url_route"]["kwargs"]["process_id"]
        self.room_group_name = f"task_{self.process_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def task_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))
